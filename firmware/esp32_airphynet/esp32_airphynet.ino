#include <WiFi.h>
#include <WiFiClientSecure.h>
#include <PubSubClient.h>
#include <DHT.h>

// --- Configuration ---
#define WIFI_SSID ""  // TODO: Check if this SSID is correct
#define WIFI_PASSWORD ""

// --- MQTT Settings (EMQX Cloud) ---
#define MQTT_SERVER "f8d02a91.ala.asia-southeast1.emqxsl.com"
#define MQTT_PORT 8883
#define MQTT_TOPIC "aqi/sensor/device_001/telemetry"
#define MQTT_CLIENT_ID "esp32_airphynet_client"

// --- Auth Credentials ---
#define MQTT_USERNAME ""
#define MQTT_PASSWORD ""

// --- Sensor Settings ---
#define SENSOR_ID "device_001"
#define DELAY_MS 5000 

// --- Pin Definitions ---
#define DHTPIN 4        // Pin D4 for DHT
#define DHTTYPE DHT22   // DHT 22 (AM2302)
#define MQ135_PIN 34    // Analog pin for MQ135

// --- Globals ---
WiFiClientSecure espClient;
PubSubClient client(espClient);
DHT dht(DHTPIN, DHTTYPE);
unsigned long lastMsg = 0;

void setup_wifi() {
  delay(10);
  Serial.println();
  Serial.print("Connecting to ");
  Serial.println(WIFI_SSID);

  WiFi.begin(WIFI_SSID, WIFI_PASSWORD);

  while (WiFi.status() != WL_CONNECTED) {
    delay(500);
    Serial.print(".");
  }

  Serial.println("");
  Serial.println("WiFi connected");
  Serial.println("IP address: ");
  Serial.println(WiFi.localIP());
}

void reconnect() {
  // Loop until we're reconnected
  while (!client.connected()) {
    Serial.print("Attempting MQTT connection...");
    // Attempt to connect
    if (client.connect(MQTT_CLIENT_ID, MQTT_USERNAME, MQTT_PASSWORD)) {
      Serial.println("connected");
      // Once connected, publish an announcement...
      client.publish("aqi/sensor/status", "connected");
    } else {
      Serial.print("failed, rc=");
      Serial.print(client.state());
      Serial.println(" try again in 5 seconds");
      // Wait 5 seconds before retrying
      delay(5000);
    }
  }
}

void setup() {
  Serial.begin(115200);
  
  // Initialize sensors
  dht.begin();
  pinMode(MQ135_PIN, INPUT);

  // Initialize WiFi and MQTT
  // IMPORTANT: For EMQX Cloud (and testing), we skip certificate validation.
  // For production, you should use .setCACert(root_ca_certificate).
  espClient.setInsecure(); 
  
  setup_wifi();
  client.setServer(MQTT_SERVER, MQTT_PORT);
}

void loop() {
  if (!client.connected()) {
    reconnect();
  }
  client.loop();

  unsigned long now = millis();
  if (now - lastMsg > DELAY_MS) {
    lastMsg = now;

    // --- Read Sensors ---
    // Reading temperature or humidity takes about 250 milliseconds!
    float h = dht.readHumidity();
    // Read temperature as Celsius (the default)
    float t = dht.readTemperature();
    
    // Read MQ135
    int mq135_value = analogRead(MQ135_PIN);

    // Check if any reads failed and exit early (to try again).
    if (isnan(h) || isnan(t)) {
      Serial.println(F("Failed to read from DHT sensor!"));
      return;
    }

    // --- Create JSON Payload ---
    // Using String for simplicity, but ArduinoJson library is recommended for complex JSON
    String payload = "{";
    payload += "\"sensor_id\": \"" + String(SENSOR_ID) + "\",";
    payload += "\"temperature\": " + String(t) + ",";
    payload += "\"humidity\": " + String(h) + ",";
    payload += "\"air_quality_raw\": " + String(mq135_value);
    payload += "}";

    Serial.print("Publishing message: ");
    Serial.println(payload);

    // --- Publish ---
    client.publish(MQTT_TOPIC, payload.c_str());
  }
}
