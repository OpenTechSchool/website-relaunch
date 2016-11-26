---
layout: simple
title: "Chapters"
permalink: /chapters/
---
  <ul class="row">
    {% for chapter in site.chapters %}
      {% include _metadata doc=chapter %}
      {% if chapter.active %}
      <li class="chapter col-xs-12 col-md-6 col-lg-3">
        <a href="{{site.baseurl}}/{{key}}" title="{{chapter.location}}"  {% if chapter.background %}style="background-image: url(/assets/statics/backgrounds/chapters/{{chapter.background}})"{% endif %}>
          {{chapter.title}}
        </a>
      </li>
      {% endif %}
    {% endfor %}
  </ul>
  Inactive:

  <ul class="row">
    {% for chapter in site.chapters %}
      {% include _metadata doc=chapter %}
      {% unless chapter.active %}
      <li class="chapter col-xs-6 col-md-3 col-lg-2">
        <a href="{{site.baseurl}}/{{key}}" title="{{chapter.location}}"  {% if chapter.background %}style="background-image: url(/assets/statics/backgrounds/chapters/{{chapter.background}})"{% endif %}>
          {{chapter.title}}
        </a>
      </li>
      {% endunless %}
    {% endfor %}
    <li>&nbsp;</li>
    <li>
      <a href="{{site.baseurl}}handbooks/city-blueprint.html">Your City?</a>
    </li>
  </ul>