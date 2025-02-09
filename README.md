# Number Classification API

This is a Node.js-based API that classifies numbers and provides interesting facts about them. The API can determine whether a number is prime, perfect, Armstrong, and more.

## Features
- Check if a number is **prime**.
- Check if a number is **perfect**.
- Check if a number is an **Armstrong number**.
- Get the **sum of the digits** of a number.
- Fetch a **fun fact** about the number using an external API.
- Caching for optimized performance.

## Project Structure
```
├── Controller
│   ├── functions.js   # Logic for number classification and caching
├── utils
│   ├── number.js      # Utility functions for number classification
│   ├── validation.js  # Middleware for number validation
├── index.js           # Entry point of the API
├── package.json       # Dependencies and scripts
├── README.md          # Project documentation
```

## Installation

1. Clone the repository:
   ```sh
   git clone <repository-url>
   cd <project-folder>
   ```
2. Install dependencies:
   ```sh
   npm install
   ```
3. Create a `.env` file and specify the port:
   ```sh
   PORT=3000
   ```
4. Start the server:
   ```sh
   npm start
   ```

## API Endpoints

### Health Check
```
GET /api/health
```
**Response:**
```json
{
  "status": "ok"
}
```

### Classify a Number
```
GET /api/classify-number/:number
```
**Example Request:**
```
GET /api/classify-number/28
```
**Example Response:**
```json
{
  "number": 28,
  "is_prime": false,
  "is_perfect": true,
  "properties": ["even"],
  "digit_sum": 10,
  "fun_fact": "28 is a perfect number"
}
```

## Middleware
- **`validation.js`** ensures the number is valid before processing.
- **Caching** is implemented using `node-cache` for improved performance.

## Dependencies
- `express` - Web framework for Node.js
- `axios` - For fetching number facts from an external API
- `node-cache` - In-memory caching for optimized requests
- `cors` - Handling cross-origin requests
- `compression` - Enabling response compression
- `dotenv` - Managing environment variables




