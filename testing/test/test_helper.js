import jsdom from 'jsdom';
import jQuery  from 'jquery';
import TestUtils from 'react-addons-test-utils';
import React from 'react';
import ReactDom from 'react-dom';
import chai, {expect} from 'chai';
import chaiJquery from 'chai-jquery';
import {Provider} from 'react-redux';
import {createStore} from 'redux';
import reducers from '../src/reducers';



//Set test environment to run like a browser in command line
global.document = jsdom.jsdom('<!doctype html><html><body></body></html>');
global.window = global.document.defaultView;
const $ = jQuery(global.window);

// build a render component helper that should render a given react class
function renderComponent(ComponentClass, props, state) {
  const componentInstance = TestUtils.renderIntoDocument(
      <Provider store={createStore(reducers, state)}>
        <ComponentClass {...props}/>
      </Provider>
  );

  return $(ReactDom.findDOMNode(componentInstance));
}


// Build helper for simulating events
$.fn.simulate = function(event, value) {
  if(value){
    this.val(value);
  }
  TestUtils.Simulate[event](this[0]);
};

// Set up chai jquery
chaiJquery(chai, chai.util, $);

export {renderComponent, expect};