// Setup globals because of webpack's providePlugin
window.React = require('react');
window.ReactDOM = require('react-dom');
window.CSSTransitionGroup = require('react-transition-group/CSSTransitionGroup');

// Just setup others cos we can :)
window.shallow = require('enzyme').shallow;
window.render = require('enzyme').render;