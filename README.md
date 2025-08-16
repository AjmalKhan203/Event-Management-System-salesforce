
# 🎫 Salesforce Event Management System

This Salesforce application manages events and student registrations using a combination of declarative and programmatic solutions.


## 🚀 Features Implemented

- **Lightning Web Component (LWC) Student Registration**  
  Custom LWC with student registration form allowing input of name, email, department, and event selection.  
  Calls Apex controller to register new or existing students.

- **Apex Controller** (`StudentRegistrationController`)  
  Handles fetching events and registering students with backend logic.

- **Apex Trigger to Enforce Registration Limits**  
  Prevents registrations that exceed maximum allowed participants for an event.

- **Declarative Configuration (Completed in Salesforce UI)**  
  - Email Alerts and Flows for sending confirmation emails on registration creation.  
  - Validation Rules to prevent registrations after event dates.  
  - Dashboards to monitor event, student, and registration data.

***

## 📂 What’s Included in the Codebase

- `force-app/main/default/StudentRegistrationform/` — LWC component files (HTML, JS, XML)  
- `force-app/main/default/classes/StudentRegistrationController.cls` — Apex controller  
- `force-app/main/default/triggers/RegistrationLimitTrigger.trigger` — Apex trigger enforcing registration limit

All declarative (Flow, validation, dashboard) work is configured in Salesforce UI and not included as source code.

***

## ⚙️ Setup Instructions

1. Clone repo and deploy source to your Salesforce org using Salesforce CLI.  
2. Verify Apex classes and triggers are deployed and active.  
3. Confirm the LWC component is available and added to the Lightning App/Page.  
4. Ensure Flows, validation rules, and email alerts are activated in your Salesforce org.  
5. Assign necessary permissions to users for Student, Event, and Registration objects.

***
