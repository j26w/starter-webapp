---
layout: page
permalink: /articles/
title: &title "News and Articles"
alt_title: *title
excerpt: "This is the page excerpt."
pagination: 
  enabled: true
  category: articles
---
<div class="uk-container uk-container-center uk-margin-top uk-margin-large-bottom">

    <div class="uk-grid" data-uk-grid-margin>
        <div class="uk-width-1-1">
            <h1 class="uk-heading-large">Articles</h1>
            <p class="uk-text-large">Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut.</p>
        </div>
    </div>

    <div class="uk-grid" data-uk-grid-margin>
        <div class="uk-width-medium-3-4">

           {% include paginator.html %}

        </div>

        <div class="uk-width-medium-1-4">
            <div class="uk-panel">
                <h3 class="uk-panel-title">Archives</h3>
                <ul class="uk-list uk-list-line">
                    <li><a href="#">January 2014</a></li>
                    <li><a href="#">December 2013</a></li>
                    <li><a href="#">November 2013</a></li>
                    <li><a href="#">October 2013</a></li>
                    <li><a href="#">September 2013</a></li>
                </ul>
            </div>
            <div class="uk-panel">
                <h3 class="uk-panel-title">Social Links</h3>
                <ul class="uk-list">
                    <li><a href="#">GitHub</a></li>
                    <li><a href="#">Twitter</a></li>
                    <li><a href="#">Facebook</a></li>
                </ul>
            </div>
        </div>
    </div>

</div>