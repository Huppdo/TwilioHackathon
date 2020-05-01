import requests
from twilio.rest import Client
import config

client = Client(config.accSID, config.accAut)

def createRoom(roomName):
  roomName = str(roomName).replace(" ","")
  room = client.video.rooms.create(enable_turn=True, type='peer-to-peer', unique_name=roomName)
  return roomName