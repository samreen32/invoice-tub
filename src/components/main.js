import React from "react";
import "../css/responsive.css";
import "../css/style.css";
import bgImg from "../assets/img/hero-bg.png";
import sliderImg from "../assets/img/invoice-img.png";
import { Link } from "react-router-dom";
import Lottie from "lottie-react";

export default function Main() {
  return (
    <div>
      <div class="hero_area">
        <div class="hero_bg_box">
          <div class="bg_img_box">
            <img src={bgImg} alt="" />
          </div>
        </div>

        <header class="header_section">
          <div class="container-fluid">
            <nav class="navbar navbar-expand-lg custom_nav-container">
              <Link class="navbar-brand" to="/">
                <span> Tub Pro's </span>
              </Link>

              <button
                class="navbar-toggler"
                type="button"
                data-toggle="collapse"
                data-target="#navbarSupportedContent"
                aria-controls="navbarSupportedContent"
                aria-expanded="false"
                aria-label="Toggle navigation"
              >
                <span class=""> </span>
              </button>

              <div class="collapse navbar-collapse" id="navbarSupportedContent">
                <ul class="navbar-nav">
                  <li class="nav-item active">
                    <Link class="nav-link" to="/">
                      Home <span class="sr-only">(current)</span>
                    </Link>
                  </li>
                  <li class="nav-item">
                    <Link class="nav-link" to="/invoice">
                      Generate Invoice
                    </Link>
                  </li>
                  <li class="nav-item">
                    <Link class="nav-link" to="/invoice_report">
                      Invoice Report
                    </Link>
                  </li>
                  <li class="nav-item">
                    <Link class="nav-link" to="/unpaid_invoice_report">
                      Unpaid Invoices
                    </Link>
                  </li>
                  <li class="nav-item">
                    <Link class="nav-link" to="/income_report">
                      Income Report
                    </Link>
                  </li>
                  <li class="nav-item">
                    <Link class="nav-link" to="/customer_report">
                      Customer Report
                    </Link>
                  </li>
                </ul>
              </div>
            </nav>
          </div>
        </header>

        <section class="slider_section">
          <div id="customCarousel1" class="carousel slide" data-ride="carousel">
            <div class="carousel-inner">
              <div class="carousel-item active">
                <div
                  class="container"
                  style={{ backgroundColor: "transparent" }}
                >
                  <div class="row">
                    <div class="col-md-6">
                      <div class="detail-box">
                        <h1>
                          Tub Installation
                          <br />& Repair
                        </h1>
                        <p>
                          Tub Pro's invoice databse provides services like
                          generate invoice, <br />
                          recieve payment, report of unpaid invoices, report of
                          customers, <br />
                          income report and much more.
                        </p>
                        <div class="btn-box">
                          <Link to="/invoice" class="btn1">
                            Get Started
                          </Link>
                        </div>
                      </div>
                    </div>
                    <div class="col-md-6">
                      <div class="img-box">
                        <img src={sliderImg} alt="" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="carousel-item">
                <div
                  class="container"
                  style={{ backgroundColor: "transparent" }}
                >
                  <div class="row">
                    <div class="col">
                      <div class="img-box" style={{ marginLeft: "39%" }}>
                        <Lottie
                          animationData={require("../assets/animation/invoice.json")}
                          loop
                          autoplay
                          className="hero-animation"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* <ol class="carousel-indicators">
              <li
                data-target="#customCarousel1"
                data-slide-to="0"
                class="active"
              ></li>
              <li data-target="#customCarousel1" data-slide-to="1"></li>
              <li data-target="#customCarousel1" data-slide-to="2"></li>
            </ol> */}
          </div>
        </section>
      </div>
    </div>
  );
}
