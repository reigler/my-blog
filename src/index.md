---
title: "Welcome to My Blog"
layout: base
hero: /images/hero-default.jpg
---
{% set postslist = collections.posts | reverse %}

<section class="intro">
    <h1>Welcome to My Digital Garden</h1>
    <p class="intro-text">A collection of thoughts, tutorials, and discoveries about web development, design, and technology. Here I share what I learn along the way.</p>
</section>

<section class="featured">
    <h2>Latest Articles</h2>
    <div class="post-list">
        {% for post in postslist | slice(0, 6) %}
        <article class="post-card">
            {% if post.data.hero %}
            <img src="{{ post.data.hero }}" alt="{{ post.data.title }}" class="post-card-image">
            {% endif %}
            <div class="post-card-content">
                <h3 class="post-card-title">
                    <a href="{{ post.url }}">{{ post.data.title }}</a>
                </h3>
                <p class="post-card-excerpt">{{ post.data.description or post.templateContent | striptags | truncate(150) }}</p>
                <div class="post-card-meta">
                    <time datetime="{{ post.date | date('YYYY-MM-DD') }}">
                        <i class="far fa-calendar"></i> {{ post.date | date('MMMM d, YYYY') }}
                    </time>
                    {% if post.data.tags %}
                    <div class="post-tags">
                        {% for tag in post.data.tags %}
                        <a href="/tags/{{ tag | slug }}/" class="tag">{{ tag }}</a>
                        {% endfor %}
                    </div>
                    {% endif %}
                </div>
            </div>
        </article>
        {% endfor %}
    </div>
</section>

<section class="cta">
    <div class="cta-content">
        <h2>Never Miss an Update</h2>
        <p>Subscribe to get the latest posts delivered to your inbox.</p>
        <form class="subscribe-form">
            <input type="email" placeholder="Your email address" required>
            <button type="submit" class="subscribe-btn">Subscribe</button>
        </form>
    </div>
</section>