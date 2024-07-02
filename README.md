# UrbanSense

## Snippets

- A view of the landing page:

  ![alt text](<screenshots/Screenshot 2024-07-02 221425.png>)

- Traffic Data Page showing City Comparison Data:

  ![alt text](<screenshots/Screenshot 2024-07-02 221519.png>)

- Example of specific City Data display:

  ![alt text](<screenshots/Screenshot 2024-07-02 221602.png>)

---

## Description / Requirements

Smart City Data Analytics platform is a comprehensive project that involves integrating various data sources, processing and analyzing the data, and presenting it in a user-friendly interface. The main focus areas of the project are to analyze and look at cities in relation to:

- Traffic Monitoring
- Air quality and pollution levels (in progress)
- Energy Consumption (in progress)
- Water Quality and Usage (in progress)

---

## Design Goals / Approach

- Use a React/TypeScript frontend to correctly display data from the backend in an efficient and aesthetic way.
- Implement a Python/Flask backend
- Analyze data using Apache Spark.
- Schedule tasks/processes using Celery.
- Style efficiently and well, with good overall UI/UX design.
- Use a MySQL database to store realtime data about Australian cities.

---

## Features

- **Realtime Data:** Realtime data displayed for the user.
- **Multiple Options:** Display different pieces of data depending on user requirements.
- **City Specific:** Ability to display city specific data to the user.
- **Data Analysis:** Data analyzed to produce aggregations and averages across large datasets quickly and efficiently.
- **Interactive Frontend:** Simple and aesthetic UI/UX design for ease of use.
- **Scheduled Tasks:** Data updated in realtime every hour (modifiable).

---

### Technologies:

- **React**
- **TypeScript**
- **Python**
- **Flask**
- **Celery**
- **Spark**
- **MySQL**

---

## Future Goals

- Add other sections: air pollution, water quality and energy consumption
- Integrate authentication for user
- Mobile Responsive Design
- Deployment. Potentially AWS or Azure

---

## Struggles

- Setting up of Spark difficult to get right locally and on a Windows machine.
- Use of Celery to correctly schedule tasks
- Chaining of tasks across multiple workers within Celery
- Getting the data and passing it the user efficiently from the backend to the frontend.
- General Python/Flask programming. New framework so had to start from scratch. Docs very helpful.

---
