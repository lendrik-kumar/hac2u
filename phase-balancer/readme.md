

## **Step 1: Instal Kafka**

```bash
tar -xzf kafka_2.13-3.2.1.tgz
cd kafka_3.2.1
```

### **1.1 Start Zookeeper**
Zookeeper is required for Kafka to manage its brokers and topics.

1. Open a terminal window.
2. Navigate to your Kafka installation folder:
   ```bash
   cd path/to/kafka_3.2.1
   ```
3. Start Zookeeper:
   ```bash
   bin/zookeeper-server-start.sh config/zookeeper.properties
   ```

   **Expected Output**:
   ```
   [2023-10-10 12:00:00,000] INFO binding to port 0.0.0.0/0.0.0.0:2181 (org.apache.zookeeper.server.NIOServerCnxnFactory)
   ```

---

### **1.2 Start Kafka**
Once Zookeeper is running, start Kafka.

1. Open a **new terminal window**.
2. Navigate to your Kafka folder:
   ```bash
   cd path/to/kafka_3.2.1
   ```
3. Start Kafka:
   ```bash
   bin/kafka-server-start.sh config/server.properties
   ```

   **Expected Output**:
   ```
   [2023-10-10 12:00:00,000] INFO Kafka version: 3.2.1 (org.apache.kafka.common.utils.AppInfoParser)
   [2023-10-10 12:00:00,000] INFO Kafka commitId: abc123 (org.apache.kafka.common.utils.AppInfoParser)
   ```

---

### **1.3 Create Kafka Topic**
Create the `smart-meter-readings` topic for your Go backend to produce and consume data.

1. Open a **new terminal window**.
2. Navigate to your Kafka folder:
   ```bash
   cd path/to/kafka_3.2.1
   ```
3. Create the topic:
   ```bash
   bin/kafka-topics.sh --create --topic smart-meter-readings --bootstrap-server localhost:9092
   ```

   **Expected Output**:
   ```
   Created topic smart-meter-readings.
   ```

---

## **Step 2: Start Redis**
Redis stores the state of each smart meter and tracks phase changes.

1. Open a **new terminal window**.
2. Start the Redis server:
   ```bash
   redis-server
   ```

   **Expected Output**:
   ```
   [12345] 10 Oct 12:00:00.000 * Ready to accept connections
   ```

---

## **Step 3: Run the Go Backend**
The Go backend processes Kafka messages, detects imbalances, and sends updates to the React frontend.

1. Open a **new terminal window**.
2. Navigate to your Go project folder:
   ```bash
   cd path/to/phase-balancer
   ```
3. Run the Go backend:
   ```bash
   go run main.go
   ```

   **Expected Output**:
   ```
   Starting mock data producer...
   Starting Kafka consumer...
   WebSocket server started on :8080
   ```

---

## **Step 4: Run the React Frontend**
The React frontend visualizes the grid in real time.

1. Open a **new terminal window**.
2. Navigate to your React project folder:
   ```bash
   cd path/to/grid-ui
   ```
3. Install dependencies (if not already done):
   ```bash
   npm install
   ```
4. Start the React app:
   ```bash
   npm start
   ```

   **Expected Output**:
   ```
   Compiled successfully!
   You can now view grid-ui in the browser.
   Local:            http://localhost:3000
   ```

---

## **Step 5: Verify the System**
### **5.1 Check Kafka Data Flow**
1. Open a **new terminal window**.
2. Navigate to your Kafka folder:
   ```bash
   cd path/to/kafka_3.2.1
   ```
3. Consume messages from the `smart-meter-readings` topic:
   ```bash
   bin/kafka-console-consumer.sh --topic smart-meter-readings --bootstrap-server localhost:9092
   ```

   **Expected Output**:
   ```
   {"phase_a":45.6,"phase_b":32.1,"phase_c":18.4,"meter_id":"meter-abc123"}
   ```

---

### **5.2 Check Redis Data**
1. Open a **new terminal window**.
2. Start the Redis CLI:
   ```bash
   redis-cli
   ```
3. Query Redis for a meter’s phase history:
   ```bash
   ZRANGE "meter:meter-abc123" 0 -1 WITHSCORES
   ```

   **Expected Output**:
   ```
   1) "B"
   2) "1696944000"
   ```

---

### **5.3 Check WebSocket Updates**
1. Open your browser and go to `http://localhost:3000`.
2. Open the browser’s developer console (F12).
3. Check the WebSocket messages under the **Network** tab.

   **Expected Output**:
   ```
   {meter_id: "meter-abc123", new_phase: "B"}
   ```

---

## **Step 6: Debugging Tips**
### **6.1 Kafka Not Starting**
- Ensure Zookeeper is running.
- Check if port `9092` is free:
  ```bash
  lsof -i :9092
  ```

### **6.2 Redis Not Starting**
- Check if port `6379` is free:
  ```bash
  lsof -i :6379
  ```

### **6.3 Go Backend Errors**
- Ensure Kafka and Redis are running.
- Check Kafka topic name (`smart-meter-readings`).
- Verify Redis address (`localhost:6379`).

### **6.4 React App Not Connecting**
- Ensure the Go backend is running.
- Check WebSocket URL (`ws://localhost:8080`).

---

## **Step 7: Stopping the System**
1. **Stop Kafka**:
   - Press `Ctrl+C` in the Kafka terminal.
2. **Stop Zookeeper**:
   - Press `Ctrl+C` in the Zookeeper terminal.
3. **Stop Redis**:
   - Press `Ctrl+C` in the Redis terminal.
4. **Stop Go Backend**:
   - Press `Ctrl+C` in the Go terminal.
5. **Stop React App**:
   - Press `Ctrl+C` in the React terminal.
