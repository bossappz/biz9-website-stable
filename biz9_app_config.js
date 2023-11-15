/* --- APP CONFIG START  --- */
const APP_ID='19';
const APP_TITLE_ID='website-19';
const APP_TITLE='BiZ9-Website';
const APP_PORT="1901";
const APP_CLOUD_BUCKET='bappz';
/* --- APP CONFIG END  --- */
/* --- FILE START --- */
const FILE_SAVE_PATH=__dirname+"/public/uploads/";//prod
//const FILE_URL="/uploads/"; //prod
const FILE_URL="https://"+APP_CLOUD_BUCKET+".s3.amazonaws.com/" //aws_s3_url
/* --- FILE END --- */
/* --- BIZ9 CONFIG START --- */
const BIZ_MAP=true;
/* --- BIZ9 CONFIG END --- */
/* --- EMAILZ START --- */
const EMAIL_SENDER="contact@biz9framework.com";
const EMAIL_REPLY="contact@biz9framework.com";
/* --- EMAILZ START --- */
/* --- MONGO START --- */
const MONGO_IP='localhost';  // OS_ENV = process.env.BIZ9_BOX_IP_217; local = 'localhost'; ip_address = '0.0.0.0'
const MONGO_USERNAME_PASSWORD=''; // local = ''; remote = 'ban:1234567@'
const MONGO_PORT="27019";
const MONGO_SERVER_USER='admin';
const MONGO_CONFIG_FILE='/etc/mongod.conf';
const SSH_KEY_FILE="";
/* --- MONGO END --- */
/* --- REDIS START --- */
const REDIS_URL="0.0.0.0";
const REDIS_PORT="27019";
/* --- REDIS END --- */
/* --- AWS START --- */
const AWS_S3_SAVE=true;
const AWS_S3_BUCKET=APP_CLOUD_BUCKET;
const AWS_KEY="";
const AWS_SECRET="";
const AWS_REGION='us-east-2';
/* --- AWS END --- */
/* --- BREVO-START --- */
//const BREVO_KEY="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";
const BREVO_KEY="";
const BREVO_FORM_SEND_SUBJECT ='Brevo Mail Message Test';
const BREVO_ORDER_SEND_TEMPLATE_ID='7';
const BREVO_FORM_SEND_TEMPLATE_ID='10';
/* --- BREVO-END --- */
exports.BREVO_KEY = BREVO_KEY;
exports.BREVO_FORM_SEND_SUBJECT = BREVO_FORM_SEND_SUBJECT;
exports.BREVO_FORM_SEND_TEMPLATE_ID = BREVO_FORM_SEND_TEMPLATE_ID;
exports.APP_ID = APP_ID;
exports.APP_TITLE_ID = APP_TITLE_ID;
exports.APP_TITLE = APP_TITLE;
exports.APP_PORT = APP_PORT;
exports.MONGO_IP = MONGO_IP;
exports.MONGO_USERNAME_PASSWORD = MONGO_USERNAME_PASSWORD;
exports.MONGO_PORT = MONGO_PORT;
exports.MONGO_SERVER_USER = MONGO_SERVER_USER;
exports.MONGO_CONFIG_FILE = MONGO_CONFIG_FILE;
exports.SSH_KEY_FILE = SSH_KEY_FILE;
exports.REDIS_URL = REDIS_URL;
exports.REDIS_PORT = REDIS_PORT;
exports.AWS_S3_SAVE = AWS_S3_SAVE;
exports.AWS_S3_BUCKET = AWS_S3_BUCKET;
exports.AWS_KEY = AWS_KEY;
exports.AWS_SECRET = AWS_SECRET;
exports.AWS_REGION = AWS_REGION;
exports.EMAIL_SENDER = EMAIL_SENDER;
exports.EMAIL_REPLY = EMAIL_REPLY;
exports.FILE_SAVE_PATH = FILE_SAVE_PATH;
exports.FILE_URL = FILE_URL;
exports.BIZ_MAP = BIZ_MAP;
