# External imports
import json
import firebase_admin
from firebase_admin import credentials
from firebase_admin import db
from firebase_admin import auth

# Internal imports
import config

cred = credentials.Certificate('twiliohackathon.json')
default_app = firebase_admin.initialize_app(cred, {
    'databaseURL': 'https://twiliohackathon-a1121.firebaseio.com/'
})

def getUID(userToken):
    decoded_token = auth.verify_id_token(userToken)
    return decoded_token['uid']

def getOnline(userID):
    refDB = db.reference('users/' + str(userID))
    usersDB = refDB.order_by_key().get()
    return usersDB["online"]

def getAllOnline():
    refDB = db.reference('users/')
    usersDB = refDB.order_by_key().get()
    onlineList = []
    for userID in usersDB:
        user = usersDB[userID]
        #print("{} is {}".format(user["displayName"],user["online"]))
        if user["online"]:
            onlineList.append(userID)
    return onlineList

def getName(userID):
    refDB = db.reference('users/' + str(userID))
    usersDB = refDB.order_by_key().get()
    return usersDB["displayName"]

def checkFriend(userID, friendID):
    refDB = db.reference('users/' + str(userID) + "/friends")
    usersDB = refDB.order_by_key().get()
    for item in usersDB:
        if item == friendID:
            return True
    return False

def setOnline(userID):
    refDB = db.reference('users/' + str(userID))
    refDB.child("online").set(True)
    return False

def setOffline(userID):
    refDB = db.reference('users/' + str(userID))
    refDB.child("online").set(False)
    return False

def getFriends(userID):
    refDB = db.reference('users/' + str(userID) + "/friends")
    usersDB = refDB.order_by_key().get()
    friendsList = []
    for item in usersDB:
        friendsList.append(item)
    return friendsList