# external imports
from flask import Flask, request, make_response, jsonify
from flask_cors import CORS
import string
import random

# internal imports
import firebase
import config
from createrooms import createRoom
import genToken
import threading
import time

app = Flask(__name__)
CORS(app)

online = []
roomDict = {}

class onlineCounter(threading.Thread):
  def __init__(self):
    threading.Thread.__init__(self)

  def run(self):
    global online
    while True:
      time.sleep(60)
      onlineList = firebase.getAllOnline()
      for member in onlineList:
          if member not in online and member != "global":
              firebase.setOffline(member)
      online = []


@app.route("/serverupdates", methods=['GET'])
def getupdates():  # Code executed upon receiving text
  global online
  userID = firebase.getUID(request.args.get("token"))
  if userID not in online:
    online.append(userID)
  if userID in roomDict.keys():
    return jsonify({"status": "200", "data": "videocall"})
  return jsonify({"status": "201"})


@app.route("/firstload", methods=['GET'])
def reload():
  global roomDict
  userID = firebase.getUID(request.args.get("token"))
  firebase.setOnline(userID)
  if userID in roomDict.keys():
    roomDict.pop(userID)
  print(roomDict)
  return jsonify({"status": "204"})


@app.route("/gettoken", methods=['GET'])
def gettoken():
  try:
    userID = firebase.getUID(request.args.get("token"))
    token = genToken.newToken(firebase.getName(userID), roomDict[userID])
    return jsonify({"status": "200", "token": token.decode("utf-8"), "room": roomDict[userID]})
  except:
    return jsonify({"status": "400"})


@app.route("/friendcall", methods=['GET'])
def callfriend():
  global roomDict
  userID = firebase.getUID(request.args.get("token"))
  friendID = request.args.get("friendUID")
  if friendID == "global":
    return jsonify({"status": "201"})
  letters = string.ascii_letters + string.digits
  appendStr = ''.join(random.choice(letters) for i in range(8))
  print(appendStr)
  roomname = createRoom(firebase.getName(userID) + "_f_" + appendStr)
  if userID not in roomDict.keys() and friendID not in roomDict.keys() and firebase.checkFriend(userID, friendID):
    roomDict[userID] = roomname
    roomDict[friendID] = roomname
    print(roomDict)
  return jsonify({"status": "200", "data": "videocall"})


@app.route("/randomcall", methods=['GET'])
def callrandom():
  global roomDict
  userID = firebase.getUID(request.args.get("token"))
  friendsList = firebase.getFriends(userID)
  friendID = ""
  for friend in friendsList:
    if friend == "global":
      continue
    if friend not in roomDict.keys():
      friendID = friend
  letters = string.ascii_letters + string.digits
  appendStr = ''.join(random.choice(letters) for i in range(8))
  roomname = createRoom(firebase.getName(userID) + "_r_" + appendStr)
  if friendID not in roomDict.keys() and userID not in roomDict.keys() and firebase.checkFriend(userID, friendID):
    roomDict[userID] = roomname
    roomDict[friendID] = roomname
    print(roomDict)
  return jsonify({"status": "200", "data": "videocall"})

if not config.demo:
    thread1 = onlineCounter()
    thread1.start()

if __name__ == "__main__":  # starts the whole program
  print("started")
  app.run(host='0.0.0.0', port=5001)
