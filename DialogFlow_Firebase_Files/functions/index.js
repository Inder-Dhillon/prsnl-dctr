const functions = require('firebase-functions');
const {dialogflow,
  UpdatePermission,
  Suggestions} = require('actions-on-google');

const WELCOME_INTENT = 'Default Welcome Intent';
const FALLBACK_INTENT = 'Default Fallback Intent';
const DOC_NAME = 'Your Doctor Name';
const sendMail = 'Expiry - yes';
const app = dialogflow();

let doctor = "John";
let patient = "Mark";
let patnum = "21569";

app.intent(WELCOME_INTENT, (conv) => {
	conv.ask("Welcome to skrr");
});
app.intent(FALLBACK_INTENT, (conv) => {
	conv.ask("Didnt get");
});
app.intent(DOC_NAME, (conv) => {
	conv.ask("Your Doctor's Name is "+doctor+". Do You Want me to call him?");
});
app.intent(sendMail, (conv, params) => {

      const nodemailer = require('nodemailer');
      const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: 'feroxsanctus@gmail.com',
          pass: 'asd?8300'
        }
      });

      var mailOptions = {
        from: 'feroxsanctus@gmail.com',
        to: 'frxsncts@gmail.com', //receiver email 
        subject: 'Prescription Renewal',
        text: 'Your patient/customer '+patient+" ("+patnum+") requires a refill for his prescription"
      };

      transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
          console.log(error);
        } else {
          console.log('Email sent: ' + info.response);
        }
      });
	conv.ask('A request to renew your prescription has been sent');
});
app.intent('Reminder', (conv) => {
  conv.ask(new UpdatePermission({
    intent: 'Reminder2'
  }));
  
});
exports.dialogflowFirebaseFulfillment = functions.https.onRequest(app);

const {google} = require('googleapis');
const {WebhookClient} = require('dialogflow-fulfillment');

// Enter your calendar ID below and service account JSON below
const calendarId = "feroxsanctus@gmail.com";
const serviceAccount = {
  "type": "service_account",
  "project_id": "homedoc-239619",
  "private_key_id": "c8ce4829ca96ef2209fe2b2dff6bfbdc4f0e44f6",
  "private_key": "-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQCXGRylPdhg7ePe\nfuOGQ1ychqY+wO1Hd1Ylp8vuih58E3xNAc2Nb08S8MERQtOTgpL4NVofDgTh/Cv9\nDFb36a5H7G6Y4yM2/mN/SK6h2wFMsl6Yncsng5oJgaNfSHi3bnD2zfVHVbXzXrIG\n+V45W8LX7yyOKonbNw/8gfDc2IbdlSII+lddCtL+OY2fXXxceB0cZEneJwPO/pFM\nCAIgN1ppRge0WI7ZGhTKuf1TDX3QhhGTib6d+3GRFqtDCLu9sfZXKo6pJBBatP92\nxGm3prhHBmvtZDJD0/AjtDoQi0ckwMzJJjj591rPRgIrTD9kePsol3TXL6n+gObq\nsufDmAVDAgMBAAECggEADJ6Oy2g2ZaYIpYEAfKqslfAS+2O+jXz0h3GTsSj88czo\n0T+ozLqypnjQDyJ/LC84Gh3OmJBhrQQUIm7A5rSwFxayh/dUbhfh9HP8Dc2ONrsg\n9msbWAIAP/IBVIhneJ5zNdGuvhX0+835XWa/TVgSFlnF5Vu9Jr9bCPJLTQ6SePgG\nO7UCM1XucZVYKFev+iuY5u5m7l3C30j0QwuLkypvH0dv6E5UN7UUdr3RtwJfZ+LN\nV/3P1O/GzA+I30bcDrqBD3Sa69w5u7YDfcJ83Rijy2xf5TWerssIPUcoWfCgVVuV\nde1ffvPM+86mgDwDB5Ola4ii//+ieyxXYi3Y5GwRyQKBgQDOJQXmf59lt4HlU17W\nxs7JfBcQOkMbBKhwS/AdYb4z0qeuqGZSj1ctkIv+AeiRXZNNI8D70VedNgWWL0T3\noUYUbdGdRg7QeA93jinMLySblsmcKIthdCRYdsLn/QNF7TXjUreSDpIpIT5pi77o\nFEMoEhLqEfY/DOfzmvfPzMnFGwKBgQC7pAICPGGvesiBy7WrXhIi+7Ny/fY7ep+s\nfowXCUJkXNSX3zLrHZ6B7hf+Y7tFuO5cMbZLc7k9VyVWVM/jL6QuVj7ZvvsTsJ0a\nSddpYT52lDbDZOVa8/JVOR6csc4CA0e196rxdPsq6pdy4nUIAmAbA1bMdCQLYGfi\nnQJAhnDK+QKBgQCojzVn6GsZ7RdVwPoHfMCRl9nz9u/wI7rnN/C61bWFAncCJcil\nMXgDVfJiXIUid/V+WgHu5ppRfl7LExO9uC1pfvKrOyHZ7JIZHDGpN9MjNgTcn3p4\n0VL20wVEVGpcvz4VBwn7b9arsvcpro8HjansFftJUi6cF52CX/DKBZXmiQKBgHuY\nbDpMy4tqtOfJ5sAaFpg0ct8rqSVEgCh+sof58WFqRB5FRqTXvbCXw/Ysew5R4a+Y\njxrj/wAIhu92rfhXSS28YWnMAlXV36WRPfKLuzkgJ3JM40YlqVm5ZhCQjcGFp5aU\nrGSfSVHbdCaYQ74i0mr4qBPD7HoR5lu+T91wsJsBAoGALPTFdm67kjGEsBTx0DJp\nLspUeRugLGcuEEYAtWQ0gxb68yxc4twm56/wZRmH8BhuL9TfUyFROBv1Mzh6BdA+\nq7hmn0LTIevVWAWptSsyDnzPrwjVJd9h75EeKPuoiMAcfFRxMUjbXeaHJYpRiG0Y\ncs/97cYohzvLu66Ro7v4GX4=\n-----END PRIVATE KEY-----\n",
  "client_email": "reminder@homedoc-239619.iam.gserviceaccount.com",
  "client_id": "111024566983592623885",
  "auth_uri": "https://accounts.google.com/o/oauth2/auth",
  "token_uri": "https://oauth2.googleapis.com/token",
  "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
  "client_x509_cert_url": "https://www.googleapis.com/robot/v1/metadata/x509/reminder%40homedoc-239619.iam.gserviceaccount.com"
}
; // Starts with {"type": "service_account",...

// Set up Google Calendar Service account credentials
const serviceAccountAuth = new google.auth.JWT({
 email: serviceAccount.client_email,
 key: serviceAccount.private_key,
 scopes: 'https://www.googleapis.com/auth/calendar'
});

const calendar = google.calendar('v3');
process.env.DEBUG = 'dialogflow:*'; // enables lib debugging statements

const timeZone = 'America/Los_Angeles';
const timeZoneOffset = '-07:00';

// Set the DialogflowApp object to handle the HTTPS POST request.
exports.dialogflowFirebaseFulfillment = functions.https.onRequest((request, response) => {
 const agent = new WebhookClient({ request, response });
 console.log("Parameters", agent.parameters);
 const appointment_type = agent.parameters.AppointmentType;
 function makeAppointment (agent) {
   // Calculate appointment start and end datetimes (end = +1hr from start)
   const dateTimeStart = new Date(Date.parse(agent.parameters.date.split('T')[0] + 'T' + agent.parameters.time.split('T')[1].split('-')[0] + timeZoneOffset));
   const dateTimeEnd = new Date(new Date(dateTimeStart).setHours(dateTimeStart.getHours() + 1));
   const appointmentTimeString = dateTimeStart.toLocaleString(
     'en-US',
     { month: 'long', day: 'numeric', hour: 'numeric', timeZone: timeZone }
   );
    // Check the availability of the time, and make an appointment if there is time on the calendar
   return createCalendarEvent(dateTimeStart, dateTimeEnd, appointment_type).then(() => {
     agent.add(`Ok, let me see if we can fit you in. ${appointmentTimeString} is fine!.`);
   }).catch(() => {
     agent.add(`I'm sorry, there are no slots available for ${appointmentTimeString}.`);
   });
 }

// Handle the Dialogflow intent named 'Schedule Appointment'.
 let intentMap = new Map();
 intentMap.set('Reminder', makeAppointment);
 agent.handleRequest(intentMap);
});

//Creates calendar event in Google Calendar
function createCalendarEvent (dateTimeStart, dateTimeEnd, appointment_type) {
 return new Promise((resolve, reject) => {
   calendar.events.list({
     auth: serviceAccountAuth, // List events for time period
     calendarId: calendarId,
     timeMin: dateTimeStart.toISOString(),
     timeMax: dateTimeEnd.toISOString()
   }, (err, calendarResponse) => {
     // Check if there is a event already on the Calendar
     if (err || calendarResponse.data.items.length > 0) {
       reject(err || new Error('Requested time conflicts with another appointment'));
     } else {
       // Create event for the requested time period
       calendar.events.insert({ auth: serviceAccountAuth,
         calendarId: calendarId,
         resource: {summary: appointment_type +' Appointment', description: appointment_type,
           start: {dateTime: dateTimeStart},
           end: {dateTime: dateTimeEnd}}
       }, (err, event) => {
         err ? reject(err) : resolve(event);
       }
       );
     }
   });
 });
}