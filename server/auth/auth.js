var passport = require('passport');
var config = require('./authid.js');
var FacebookStrategy = require('passport-facebook').Strategy;
var GoogleStrategy = require('passport-google-oauth2').Strategy;
var LocalStrategy = require('passport-local').Strategy;