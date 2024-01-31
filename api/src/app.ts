import express from 'express';
import cors from 'cors';
import { routes } from "./routes/index.js"
import { itineraryRoutes } from './routes/itineraryRoutes.js';
import { activityRoutes } from './routes/activityRoutes.js'
import supertokens from "supertokens-node";
import Session from "supertokens-node/recipe/session";
import ThirdPartyEmailPassword from "supertokens-node/recipe/thirdpartyemailpassword";
import { middleware } from "supertokens-node/framework/express";
import { errorHandler } from "supertokens-node/framework/express";

(async function () {
  await import("dotenv/config")
})()

const app = express();
const port = process.env.PORT || 3000;

supertokens.init({
  framework: "express",
  supertokens: {
    // https://try.supertokens.com is for demo purposes. Replace this with the address of your core instance (sign up on supertokens.com), or self host a core.
    connectionURI: "https://try.supertokens.com",
    // apiKey: <API_KEY(if configured)>,
  },
  appInfo: {
    // learn more about this on https://supertokens.com/docs/thirdpartyemailpassword/appinfo
    appName: process.env.APP_NAME,
    apiDomain: process.env.API_DOMAIN,
    websiteDomain: process.env.WEBSITE_DOMAIN,
    apiBasePath: "/auth",
    websiteBasePath: "/auth"
  },
  recipeList: [
    ThirdPartyEmailPassword.init({
      // We have provided you with development keys which you can use for testing.
      // IMPORTANT: Please replace them with your own OAuth keys for production use.
      providers: [{
        config: {
          thirdPartyId: "google",
          clients: [{
            clientId: "1060725074195-kmeum4crr01uirfl2op9kd5acmi9jutn.apps.googleusercontent.com",
            clientSecret: "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"
          }]
        }
      }, {
        config: {
          thirdPartyId: "github",
          clients: [{
            clientId: "467101b197249757c71f",
            clientSecret: "e97051221f4b6426e8fe8d51486396703012f5bd"
          }]
        }
      }, {
        config: {
          thirdPartyId: "apple",
          clients: [{
            clientId: "4398792-io.supertokens.example.service",
            additionalConfig: {
              keyId: "7M48Y4RYDL",
              privateKey:
                "-----BEGIN PRIVATE KEY-----\nMIGTAgEAMBMGByqGSM49AgEGCCqGSM49AwEHBHkwdwIBAQQgu8gXs+XYkqXD6Ala9Sf/iJXzhbwcoG5dMh1OonpdJUmgCgYIKoZIzj0DAQehRANCAASfrvlFbFCYqn3I2zeknYXLwtH30JuOKestDbSfZYxZNMqhF/OzdZFTV0zc5u5s3eN+oCWbnvl0hM+9IW0UlkdA\n-----END PRIVATE KEY-----",
              teamId: "YWQCXGJRJL",
            }
          }]
        }
      }],
    }),
    Session.init() // initializes session features
  ]
});

app.use(cors({
  origin: process.env.WEBSITE_DOMAIN,
  allowedHeaders: ["content-type", ...supertokens.getAllCORSHeaders()],
  credentials: true,
}));

// IMPORTANT: CORS should be before the below line.
app.use(middleware());
app.use('/', routes)
app.use('/itinerary', itineraryRoutes)
app.use('/activity', activityRoutes)

app.use(errorHandler())
app.use((err, req, res, next) => {
  res.status(err.status || 400).json({
    success: false,
    message: err.message || 'An error occured.',
    errors: err.error || [],
  });
});

app.use((req, res) => {
  res.status(404).json({ success: false, message: 'Resource not found.' });
});

app.listen(port, () => {
  return console.log(`Express is listening at http://localhost:${port}`);
});