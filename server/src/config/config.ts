export default class Config {
    public static github_client_id = process.env.TYPESCRIPTUSERS_GITHUB_CLIENT_ID;
    public static github_client_secret = process.env.TYPESCRIPTUSERS_GITHUB_SECRET;
    public static jwt_secret = process.env.TYPESCRIPTUSERS_JWT_SECRET;
    public static mongodb_port = process.env.TYPESCRIPTUSERS_MONGODB_PORT;
    public static mailgun_api_key = process.env.TYPESCRIPTUSERS_MAILGUN_API_KEY;
    public static mailgun_domain = process.env.TYPESCRIPTUSERS_MAILGUN_DOMAIN;
    public static mailgun_sender_email = process.env.TYPESCRIPTUSERS_MAILGUN_SENDER_EMAIL;
    public static log_directory = process.env.TYPESCRIPTUSERS_LOG_DIRECTORY || "/var/log/typescriptusers/log";
    public static log_level = process.env.TYPESCRIPTUSERS_LOG_LEVEL || "info";
    public static production_mode = process.env.TYPESCRIPTUSERS_PRODUCTION_MODE || "true";
    public static upload_tmp_dir = process.env.TYPESCRIPTUSERS_UPLOAD_TMP_DIR || "./../assets/user_upload/tmp";
    public static upload_dir = process.env.TYPESCRIPTUSERS_UPLOAD_DIR || "./../assets/user_upload";
}