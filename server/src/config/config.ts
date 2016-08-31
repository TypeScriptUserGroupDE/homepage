export default class Config {
    public static github_client_id = process.env.TYPESCRIPTUSERS_GITHUB_CLIENT_ID;
    public static github_client_secret = process.env.TYPESCRIPTUSERS_GITHUB_SECRET;
    public static jwt_secret = process.env.TYPESCRIPTUSERS_JWT_SECRET;
    public static mongodb_port = process.env.TYPESCRIPTUSERS_MONGODB_PORT;
    public static mailgun_api_key = process.env.TYPESCRIPTUSERS_MAILGUN_API_KEY;
    public static mailgun_domain = process.env.TYPESCRIPTUSERS_MAILGUN_DOMAIN;
    public static mailgun_sender_email = process.env.TYPESCRIPTUSERS_MAILGUN_SENDER_EMAIL;
    public static log_directory = process.env.TYPESCRIPTUSERS_LOG_DIRECTORY || "/var/log/typescriptusers";
    public static log_level = process.env.TYPESCRIPTUSERS_LOG_LEVEL || "error";
    public static production_mode = process.env.TYPESCRIPTUSERS_PRODUCTION_MODE || "true";
}