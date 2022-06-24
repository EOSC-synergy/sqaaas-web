module.exports = {
    "provider_url": "https://aai-dev.egi.eu/auth/realms/egi/protocol",
    "client_id": "10333f08-7e8f-4cc4-bba0-e66f4e5505d0",
    "redirect_uri" : `${location.origin}/callback.html`,
    "url_authorize": "https://aai-dev.egi.eu/auth/realms/egi/protocol/openid-connect/auth",
    "url_user_info": "https://aai-dev.egi.eu/auth/realms/egi/protocol/openid-connect/userinfo",
    "token_endpoint": "https://aai-dev.egi.eu/auth/realms/egi/protocol/openid-connect/token",
    "api" : "https://api.sqaaas.eosc-synergy.eu/v1",
}
