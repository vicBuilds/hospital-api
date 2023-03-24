# hospital-api

Basic design of an API for the doctors of a Hospital which has been allocated by the
govt for testing and quarantine + well being of COVID-19 patients(This has only api. No Frontend as of Now)

There can be 2 types of Users
- Doctors
- Patients

 Doctors can log in.
Each time a patient visits, the doctor will follow 2 steps
- Register the patient in the app (using phone number, if the patient already exists, just
returns the patient info in the API)
- After the checkup, create a Report
Patient Report will have the following fields
1. Created by doctor
2. Status (With enums as following):
3. Can be either of: [Negative, Travelled-Quarantine, Symptoms-Quarantine,
Positive-Admit]
4. Date

 Routes(For the version 1 of the api version) are as following:

- /api/v1/doctors/register → with username and password and phone number(optional)
- /api/v1/doctors/login → returns the JWT to be used

The following routes can only be hit by a doctor who is registered and currently logged in:
- /api/v1/patients/register 
- /api/v1/patients/:id/create_report
- /api/v1/patients/:id/all_reports → List all the reports of a patient oldest to latest
- /api/v1/reports/:status → List all the reports of all the patients filtered by a specific status

***Note the App is currently hosted in cyclic and the link is below:
https://good-tan-chipmunk-belt.cyclic.app
So the Api's will work something like this: https://good-tan-chipmunk-belt.cyclic.app/api/v1/doctor/register and so on....

//Use this and have fun.
Created by: Victor Mitra
