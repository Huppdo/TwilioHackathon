from twilio.jwt.access_token import AccessToken
from twilio.jwt.access_token.grants import VideoGrant
import config

def newToken(displayName,room):
  # Create access token with credentials
  token = AccessToken(config.accSID, config.apiKey, config.apiSec, identity=displayName)

  # Create a Video grant and add to token
  video_grant = VideoGrant(room=room)
  token.add_grant(video_grant)

  # Return token info as JSON
  return token.to_jwt()