import React, { Component } from 'react'
export default class Login extends Component {
  render() {
    return (
      <form>
        <label className="sign">
          Sign In
        </label>
        <label className="slogan">
          Sign in and start scrolling through the marketplace!
        </label>
        <div className="mb-3">
          <label>Email address</label>
          <input
            type="email"
            className="form-control"
            placeholder="Enter email"
          />
        </div>
        <div className="mb-3">
          <label>Password</label>
          <input
            type="password"
            className="form-control"
            placeholder="Enter password"
          />
        </div>
        <div className="mb-3">
          <div className="custom-control custom-checkbox">
            <input
              type="checkbox"
              className="custom-control-input"
              id="customCheck1"
            />
            <label className="custom-control-label" htmlFor="customCheck1">
              Remember me
            </label>
          </div>
        </div>
        <div className="d-grid">
            <button type="submit" className="btn btn-success">
              <a href="/sell-page">Submit</a>
            </button>
        </div>
        <p className="forgot-password text-right">
          Forgot <a href="#">password?</a>
        </p>
        <p className="sign-up text-right">
          Don't have an account? <a href="/sign-up">Sign up!</a>
        </p>
      </form>
    )
  }
}