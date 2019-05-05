# prsnl-dctr

prnsl-dctr is an IoT integration for the medication and drugs market for easier accessibility for people of old-age and impairments. We implemented this in a three-fold 

  - Web interface for uploading the pill-bottle label. (We wanted an android app but due to time-constraints we had to make do with this.)
  - Python script hosted on heroku that parses the image using Google's Vision API and sends uses Google's Calender API to set the reminders
  - Google's Dialogflow and Firebase Cloud Functions API to sound off the reminders for the conveinence of the user and other methods that offer assistive benefit to the end user.


<img src="https://i.imgur.com/z2F8Ocn.jpg" alt="vision"
	title="vision" width="200" height="430" />
# Categorizes we are going for:

  - API Use
  - Assistive Tech
  - IoT
  - Overall




## Things that this project can implement in the future:
 - Integration for Amazon's API for over-the-counter drugs
 - Using the Telemetry API from google to create automated IVR-like calling for automating creation of doctor appointments and ordering refills for prescriptions by phone.
 - Integration of e-911 calling with a location service for emergency calling using Twilio
 - Notification service for missed medication doses for doctors/concerned family
 - Keeping track of the amount of medication ordered for automating refills
 
 **We can implement these in a week's time and we can explain how we would do this.**



# Tech/APIs Used (so far)

* [Node. js] 
* [Dialogflow] 
* [Firebase] 
* [Vanilla Javascript] 
* [HTML] 
* [CSS] 
* [Vision API]
* [Nodemailer] 
* [Webhooks] 
* [Calendar API] 
* [Python] 
* [Heroku] 


### Calls fully/partly supported right now


```sh
Who is my doctor?
When does my prescription end?
When is my next medication due?
Give me my meds for today
```
