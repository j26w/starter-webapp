---
layout: page
permalink: /work/
title: Work Portfolio
excerpt: "Excerpt here"
classes:
  - yd-home
---

<div class="uk-container uk-container-center uk-margin-top uk-margin-large-bottom">

    <div class="uk-grid" data-uk-grid-margin>
        <div class="uk-width-1-1">
            <h1 class="uk-heading-large">Portfolio</h1>
            <p class="uk-text-large">Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut.</p>
        </div>
    </div>

    <div class="uk-grid" data-uk-grid-margin>
        <div class="uk-width-1-1">

            <ul id="my-id" class="uk-subnav uk-subnav-pill">
                <li class="uk-disabled"><span>Filter:</span></li>
                <li data-uk-filter="" class="uk-active"><a href="">All</a></li>
                <li data-uk-filter="filter-a"><a href="">Type A</a></li>
                <li data-uk-filter="filter-b"><a href="">Type B</a></li>
                <li data-uk-filter="filter-c"><a href="">Type C</a></li>
                <li class="uk-disabled"><span>Sort:</span></li>
                <li data-uk-sort="my-category"><a href="">Ascending</a></li>
                <li data-uk-sort="my-category:desc"><a href="">Descending</a></li>
            </ul>

            <!-- Dynamic Grid -->
            <div class="uk-grid uk-grid-width-small-1-2 uk-grid-width-medium-1-4" data-uk-grid="{gutter: 20, controls: '#my-id'}">
                
                <div data-uk-filter="filter-a" data-my-category="20170101">
                    <div class="uk-panel uk-panel-box">
                        <div class="uk-panel-badge uk-badge">Type A</div>
                        <h3 class="uk-panel-title">Type A Item Title</h3>
                        <p>January 1, 2017</p>
                    </div>
                </div>
                <div data-uk-filter="filter-b" data-my-category="20170401">
                    <div class="uk-panel uk-panel-box">
                        <div class="uk-panel-badge uk-badge">Type B</div>
                        <h3 class="uk-panel-title">Type B Item Title</h3>
                        <p>April 1, 2017</p>
                    </div>
                </div>
                <div data-uk-filter="filter-a,filter-b" data-my-category="20170901">
                    <div class="uk-panel uk-panel-box">
                        <div class="uk-panel-badge uk-badge">Type A &amp; B</div>
                        <h3 class="uk-panel-title">Type A and B Item Title</h3>
                        <p>September 1, 2017</p>
                    </div>
                </div>
                <div data-uk-filter="filter-a" data-my-category="20170201">
                    <div class="uk-panel uk-panel-box">
                        <div class="uk-panel-badge uk-badge">Type A</div>
                        <h3 class="uk-panel-title">Type A Item Title</h3>
                        <p>February 1, 2017</p>
                    </div>
                </div>
                <div data-uk-filter="filter-c" data-my-category="20170701">
                    <div class="uk-panel uk-panel-box">
                        <div class="uk-panel-badge uk-badge">Type C</div>
                        <h3 class="uk-panel-title">Type C Item Title</h3>
                        <p>July 1, 2017</p>
                    </div>
                </div>
                <div data-uk-filter="filter-b,filter-c" data-my-category="20170801">
                    <div class="uk-panel uk-panel-box">
                        <div class="uk-panel-badge uk-badge">Type B &amp; C</div>
                        <h3 class="uk-panel-title">Type B and C Item Title</h3>
                        <p>August 1, 2017</p>
                    </div>
                </div>
            
            </div>

        </div>
    </div>
</div>
