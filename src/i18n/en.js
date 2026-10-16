// Texts (English). `shared` is used on every page, the other exports belong to one page each.
// Numbers in {placeholders} come from src/data (siteValues.js); the texts carry no prices.

export const shared = {
  "skipLink": "Skip to content",
  "nav": {
    "team": "Team",
    "services": "Services",
    "faq": "FAQ",
    "contact": "Contact",
    "configurator": "Configurator",
    "projects": "Projects",
    "maintenance": "Maintenance"
  },
  "footer": {
    "copyright": "© 2026 Sin Digital, Digital Agency & Web Design Zürich. All rights reserved.",
    "imprint": "Imprint",
    "privacy": "Privacy Policy",
    "terms": "T&C",
    "websiteCheck": "Website check"
  },
  "pendingSubmitHint": "One moment please, the form is being prepared …",
  "vatNote": "All prices in CHF. Sin Digital is not subject to VAT.",
  "contactForm": {
    "nameLabel": "Name *",
    "emailLabel": "Email *",
    "subjectLabel": "Subject",
    "messageLabel": "Message *",
    "namePlaceholder": "Your full name",
    "subjectPlaceholder": "What's it about?",
    "messagePlaceholder": "Tell us about your project...",
    "privacyBefore": "I have read and agree to the ",
    "privacyLink": "Privacy Policy",
    "privacyAfter": ". *",
    "submit": "Send message",
    "prefill": {
      "individuell": {
        "subject": "Discuss a custom project",
        "message": "Hello\nI would like to discuss a custom project: more than {maxPages} pages or custom functionality.\nA few words about my plans:\n"
      }
    }
  },
  "packages": {
    "landingpage": { "name": "Landing page" },
    "onepager": { "name": "One-pager" },
    "firmenwebsite": { "name": "Company website" },
    "individuell": { "name": "Custom project" }
  },
  "care": {
    "plans": {
      "basis": {
        "name": "Basic",
        "summary": "Hosting, security, updates, uptime monitoring, weekly backups. Reply within 3 working days."
      },
      "business": {
        "name": "Business",
        "summary": "Plus daily backups, 30 minutes of changes per month, reply within 2 working days, quarterly report."
      },
      "premium": {
        "name": "Premium",
        "summary": "Plus loading-time monitoring, 60 minutes of changes per month, reply within 1 working day, monthly report."
      }
    },
    "badges": {
      "recommended": "My recommendation",
      "limited": "Limited places"
    }
  }
}

export const home = {
  "meta": {
    "title": "Digital Agency Zurich | Web Design & Development for SMEs | Sin Digital",
    "description": "Sin Digital, web design and development in Zurich. Websites for SMEs at a fixed price from CHF {from}: landing page in {landingpageWeeks} weeks, company website in {firmenwebsiteWeeks} weeks. {months} months of maintenance included, then from CHF {care} / month.",
    "ogTitle": "Digital Agency Zurich | Web Design & Development | Sin Digital",
    "ogDescription": "Websites for SMEs in Zurich at a fixed price from CHF {from}. Your own code, the website is yours, {months} months of maintenance included.",
    "twitterTitle": "Digital Agency Zurich | Web Design & Development | Sin Digital",
    "twitterDescription": "Sin Digital, web design and development in Zurich. Fixed-price websites from CHF {from}, landing page in {landingpageWeeks} weeks."
  },
  "hero": {
    "label": "Sin Digital, Digital Agency & Web Agency Zürich",
    "title1": "WEBSITES",
    "title2": "FIXED PRICE.",
    "cta": "Calculate your price",
    "text": "Websites for SMEs in Zurich, with your own code and at a fixed price. Landing page in {landingpageWeeks} weeks, company website in {firmenwebsiteWeeks} weeks, counted from complete content. You talk directly to the person who builds it.",
    "trust": [
      "✓ From CHF {from}, fixed price",
      "✓ Landing page in {landingpageWeeks} weeks",
      "✓ Website and code are yours",
      "✓ {months} months of maintenance included, then from CHF {care} / month"
    ]
  },
  "localSeo": {
    "title1": "WEB DESIGN ZURICH",
    "title2": "DIGITAL AGENCY",
    "desc1": "Sin Digital builds professional websites in Zurich for SMEs, startups and local businesses, at a fixed price. Web design, development and SEO from one source, so your website gets found and brings in enquiries.",
    "desc2": "Looking to have a website built in Zurich? From the first idea to publication, clear, efficient and personal.",
    "links": [
      "Website Zurich",
      "Affordable Website Zurich",
      "Web Design Zurich",
      "SEO Agency Zurich",
      "Web Development Zurich",
      "Digital Agency Zurich",
      "Web Agency Zurich"
    ]
  },
  "team": {
    "title1": "THE MIND",
    "title2": "BEHIND IT",
    "desc": "Sin Digital is a one-person agency in Zurich: concept, design and code from one source, with clear prices and direct contact.",
    "role": "Founder, Sin Digital, Digital Agency Zurich",
    "bio": "As the founder of digital agency Sin Digital, I combine strategic thinking with technical precision. My mission: making businesses in Zürich digitally visible with professional web design and development, honest, efficient and personal."
  },
  "clients": {
    "label": "Trusted By"
  },
  "projects": {
    "label": "Services & Prices",
    "title1": "SMALL ON",
    "title2": "PURPOSE.",
    "intro": "You talk to the person who builds your website.",
    "person": {
      "name": "Cem Sin",
      "role": "Concept, design and code",
      "photoAlt": "Cem Sin, founder of Sin Digital"
    },
    "packageLabel": "Package {n}",
    "idealFor": "Ideal for",
    "scope": "Scope",
    "fixedPrice": "fixed price",
    "priceNote": "{weeks} weeks · {months} months of {carePlan} maintenance included",
    "calculate": "Calculate {name}",
    "packages": {
      "landingpage": {
        "claim": "One page, one goal: enquiries, sign-ups or bookings.",
        "idealFor": "Events, campaigns, new businesses, a single offer.",
        "scope": ["Up to {sections} sections", "One clear main button", "Form"]
      },
      "onepager": {
        "claim": "Your whole offer on one page, built for scrolling.",
        "idealFor": "Trades, hairdressers, associations, freelancers.",
        "scope": ["Up to {sections} sections", "Menu jumps to every section", "Form, map"]
      },
      "firmenwebsite": {
        "claim": "Several pages for businesses with several services.",
        "idealFor": "SMEs with several offers, startups that need to explain.",
        "scope": ["Up to {pages} pages", "A page for every service", "Form, map"]
      }
    },
    "launchLine": "Launch discount: CHF {launchPrice} for one of the next {totalSlots} projects. {remainingSlots} places left, until {endDate}.",
    "individual": {
      "text": "More than {maxPages} pages or custom functionality? Custom projects from CHF {individuell}.",
      "button": "Discuss your project"
    },
    "always": {
      "title": "Always included",
      "items": [
        "Your own code, no website builder.",
        "Website, code and domain are yours once paid.",
        "Built for phone, tablet and computer.",
        "Set up cleanly for Google: titles, descriptions, fast loading.",
        "{rounds} rounds of corrections and {bugfixDays} days of bug fixing after publication.",
        "{months} months of maintenance included, then optional from CHF {care} / month."
      ],
      "careLink": "See the maintenance plans"
    },
    "process": {
      "label": "How it works",
      "title1": "FOUR STEPS",
      "title2": "TO YOUR WEBSITE",
      "steps": [
        {
          "name": "First call",
          "desc": "You tell me what you need."
        },
        {
          "name": "Fixed-price offer",
          "desc": "You know exactly what you get and what it costs."
        },
        {
          "name": "Design and build",
          "desc": "You see the design first, {rounds} rounds of corrections are included."
        },
        {
          "name": "Publication",
          "desc": "After the final payment the site goes online, {months} months of maintenance are included.",
          "link": "See the maintenance plans"
        }
      ]
    },
    "cta": {
      "title": "Ready for your new website?",
      "text": "In a no-obligation conversation, Sin Digital will show you exactly what's possible for your business. No sales pitch, just an honest exchange about whether and how we could work together.",
      "button": "Book a free call with Sin Digital"
    }
  },
  "faq": {
    "label": "FAQ",
    "title1": "COMMON",
    "title2": "QUESTIONS",
    "intro": "The most common questions about prices, process and working together.",
    "items": [
      {
        "id": 1,
        "question": "Why not just use Wix or Jimdo?",
        "answer": "A website builder is enough if you have the time and want to do everything yourself. There you pay for the platform every month and stay tied to it. With me you pay for the website once, after that only domain and hosting, maintenance if you choose."
      },
      {
        "id": 2,
        "question": "Landing page or one-pager, what is the difference?",
        "answer": "A landing page has a single goal, for example sign-ups for an event. A one-pager shows your whole offer on one page. If your services need pages of their own, the company website is the right fit."
      },
      {
        "id": 3,
        "question": "Who writes the texts?",
        "answer": "You know your business best, so you provide the content. I tell you exactly which texts and images I need. If you lack the time, I write the texts for an extra charge."
      },
      {
        "id": 4,
        "question": "How long does it take?",
        "answer": "A landing page {landingpageWeeks} weeks, a one-pager {onepagerWeeks} weeks, a company website {firmenwebsiteWeeks} weeks. The clock starts on the day all content is in. In a hurry? There is express."
      },
      {
        "id": 5,
        "question": "Isn't that more expensive than a freelancer?",
        "answer": "My price sits between freelancers using website builders and agencies. In return you get a fixed price, your own code and a website that belongs to you. And you always talk directly to me."
      },
      {
        "id": 6,
        "launchOnly": true,
        "question": "Why is there a launch discount?",
        "answer": "Sin Digital is young and I am building my portfolio. The next {totalSlots} projects therefore get {launchPercent} % off the package price, and in return I may show them as references. After that the regular price applies."
      },
      {
        "id": 7,
        "question": "What does it cost once the website is online?",
        "answer": "The first {months} months of maintenance are included. After that it is optional and costs from CHF {care} per month. The domain is listed separately in the offer."
      },
      {
        "id": 8,
        "question": "What if I want to switch later?",
        "answer": "Website, code and domain are yours. If you switch, you receive all files and access details. Ongoing maintenance can be cancelled with {noticeDays} days' notice to the end of a month, at the earliest after {minMonths} months."
      },
      {
        "id": 9,
        "question": "You work alone. What if you are unavailable?",
        "answer": "Website, code and domain are yours, so nothing depends on me alone. The code is written in common web technologies, other professionals can continue it."
      }
    ]
  },
  "reviews": {
    "label": "Google Reviews",
    "title1": "REAL",
    "title2": "CLIENT FEEDBACK",
    "intro": "Directly from clients on Google. Honest feedback about collaboration, quality and results.",
    "items": [
      {
        "text": "Sin Digital really helped me improve my online presence. I saw astonishing results within a week. Mr. Sin was extremely polite from start to finish and always available.",
        "author": "Leonard Mathier"
      },
      {
        "text": "Excellent service!!",
        "author": "Vasco Simic"
      },
      {
        "text": "Great service and a new era for Coiffeur Zurich since he built the website. I have not seen the salon this full in a long time.",
        "author": "Kaan Cebeci"
      },
      {
        "text": "Best service!!!!",
        "author": "Louie"
      }
    ],
    "googleButton": "Read more on Google"
  },
  "contact": {
    "subtitle": "Ready for your next project? Write what you have in mind. You get a reply and a fixed-price offer.",
    "details": "Whether a new website, a rework of your current site or a custom project: get in touch. We usually reply within 24 hours with a first assessment.",
    "locationLabel": "Sin Digital, Location Zürich",
    "phoneLabel": "Phone",
    "emailLabel": "Email",
    "followLabel": "Follow Sin Digital"
  }
}

export const konfigurator = {
  "meta": {
    "title": "Project Configurator: Your Fixed Price in Two Minutes | Sin Digital",
    "description": "Pick a package, add extras, see your fixed price: landing page CHF {landingpage}, one-pager CHF {onepager}, company website CHF {firmenwebsite}. With duration, express and launch discount. No obligation, no sign-up.",
    "ogTitle": "What does your website cost? Fixed-price configurator | Sin Digital"
  },
  "breadcrumb": "Configurator",
  "label": "Project configurator",
  "title1": "PLAN FIRST,",
  "title2": "THEN BUILD.",
  "intro": "You know the price before I write the first line. Pick a package and extras, the fixed price and duration update live. At the end your selection goes to me as an enquiry.",
  "stepWord": "Step",
  "ofWord": "of",
  "steps": {
    "package": {
      "title": "Package",
      "question": "What are we building?"
    },
    "addons": {
      "title": "Extras",
      "question": "What goes on top?",
      "hint": "All optional, all fixed prices. The duration grows accordingly."
    },
    "terms": {
      "title": "Discount & date",
      "question": "Discount and preferred start",
      "hint": "Discounts never apply to maintenance or the concept talk. The preferred start has no effect on the price."
    },
    "request": {
      "title": "Enquiry",
      "question": "Almost there."
    }
  },
  "packages": {
    "landingpage": {
      "desc": "One page, one goal. Up to {sections} sections, one clear main button, form.",
      "meta": "{weeks} weeks · {months} months of {carePlan} maintenance included"
    },
    "onepager": {
      "desc": "Your whole offer on one page. Up to {sections} sections, menu, form, map.",
      "meta": "{weeks} weeks · {months} months of {carePlan} maintenance included"
    },
    "firmenwebsite": {
      "desc": "Several pages for several services. Up to {pages} pages included, a page for every service, form, map.",
      "meta": "{weeks} weeks · {months} months of {carePlan} maintenance included"
    },
    "individuell": {
      "desc": "More than {maxPages} pages or custom functionality. Fixed price after a concept talk: {conceptHours} hours, CHF {conceptPrice}, credited when you order.",
      "meta": "Duration agreed in the talk"
    }
  },
  "badge": "My recommendation",
  "fixedPrice": "fixed price",
  "pages": {
    "label": "Pages in total",
    "hint": "{included} pages are included, every further page costs CHF {extraPage}. From 6 pages +1 week, from 11 pages +2 weeks.",
    "tooMany": "More than {maxPages} pages? Then {individuell} is the right fit.",
    "onlyFirm": "Additional pages are available with the {firmenwebsite}."
  },
  "languages": {
    "label": "Additional languages",
    "hint": "Per language +{languagePercent} % on package and extra pages, +{languageWeeks} week. You provide the translation.",
    "none": "none",
    "one": "1 language",
    "many": "{n} languages"
  },
  "addons": {
    "shop": {
      "name": "Shop Start",
      "desc": "Up to {shopProducts} products, payment through an established provider.",
      "hint": "Larger shops are a custom project."
    },
    "booking": {
      "name": "Embed a booking tool",
      "desc": "Your existing booking tool is embedded in the website.",
      "hint": "A booking system of your own is a custom project."
    },
    "cms": {
      "name": "CMS",
      "desc": "Edit texts and images yourself, including a {cmsMinutes}-minute introduction."
    },
    "seo": {
      "name": "Local SEO package",
      "desc": "{seoKeywords} search terms, optimisation, registration with Google, Google Business Profile."
    },
    "logo": {
      "name": "Logo",
      "desc": "{logoDrafts} drafts, {logoRevisions} revision."
    },
    "branding": {
      "name": "Logo and branding",
      "desc": "Logo, colours, fonts, a small template."
    },
    "texts": {
      "name": "Copywriting",
      "desc": "I write the texts for all pages, you provide the facts. Plus CHF {textsPerPage} per extra page."
    },
    "domain": {
      "name": "Set up domain and email",
      "desc": "Up to {mailboxes} mailboxes. The domain is registered to you, provider costs are separate."
    },
    "express": {
      "name": "Express",
      "desc": "Delivery in around {expressTime} % of the usual time, for a {expressPercent} % surcharge.",
      "hint": "Subject to availability and only with finished content."
    }
  },
  "reasons": {
    "onlyFirmenwebsite": "Company website only.",
    "notWith": "Not together with {blocker}.",
    "expressFromOnepager": "Express is available from the one-pager up.",
    "expressNotWithTexts": "Express is not available together with copywriting."
  },
  "dropped": {
    "intro": "Deselected with the package change:",
    "pages": "extra pages",
    "shop": "Shop Start",
    "express": "express"
  },
  "discounts": {
    "launch": {
      "name": "Use the launch discount",
      "desc": "{launchPercent} % off the package price, for one of the next {totalSlots} projects. {remainingSlots} places left, until {endDate}.",
      "condition": "Condition: I may show your project as a reference with name, logo and screenshots."
    },
    "club": {
      "name": "Non-profit association",
      "desc": "Minus {clubPercent} % on the total price.",
      "hint": "Proof in the conversation."
    },
    "higher": "The higher discount applies."
  },
  "timings": {
    "asap": {
      "name": "As soon as possible",
      "desc": "Start in the next few weeks. Whether that works, we settle in the offer."
    },
    "soon": {
      "name": "Within the next 1 to 3 months",
      "desc": "The usual way: get to know each other, concept, start."
    },
    "flexible": {
      "name": "Flexible",
      "desc": "No fixed date, we plan it together."
    },
    "date": {
      "name": "Individual date",
      "desc": "You name a date, we plan towards it."
    }
  },
  "start": {
    "label": "Preferred date",
    "hint": "Today at the earliest, as a guide value for planning.",
    "tooEarly": "Delivery time counts from complete content. For an earlier date there is express."
  },
  "dateLocale": "en-GB",
  "summary": {
    "title": "Your fixed price",
    "from": "from",
    "currency": "CHF",
    "onRequest": "Fixed price after the concept talk",
    "week": "week",
    "weeks": "weeks",
    "day": "working day",
    "days": "working days",
    "durationOnRequest": "Duration agreed in the talk",
    "selection": "Your selection",
    "lines": {
      "package": "Package",
      "pages": "Extra pages",
      "languages": "Additional languages",
      "addons": "Extras",
      "express": "Express",
      "launch": "Launch discount",
      "club": "Association discount"
    },
    "notes": [
      "Your fixed price, one-time. Domain and hosting are listed separately in the offer. After {months} included months, maintenance is optional.",
      "You only pay more if you want more than agreed. I always tell you beforehand.",
      "You provide texts and images. I tell you exactly what I need. No time to write? Choose the copywriting extra.",
      "In a hurry? With express I deliver in around {expressTime} % of the usual time, for a {expressPercent} % surcharge. Available from the one-pager up, subject to availability and once all content is ready."
    ]
  },
  "next": "Next",
  "back": "Back",
  "toRequest": "Request a fixed-price offer",
  "discuss": "Discuss your project",
  "request": {
    "title": "Request a fixed-price offer",
    "text": "Your selection comes along. Add your name, email and a few words about your project. You usually get a reply within 24 hours.",
    "titleIndividual": "Discuss your project",
    "textIndividual": "Tell me briefly what you want to build. I will get in touch for a concept talk: {conceptHours} hours, CHF {conceptPrice}, credited when you order."
  },
  "configuration": {
    "package": "Package",
    "pages": "Pages",
    "languages": "Additional languages",
    "addons": "Extras",
    "none": "none",
    "express": "Express",
    "discount": "Discount",
    "timing": "Preferred start",
    "startOpen": "Individual date, still open",
    "price": "Fixed price",
    "priceOnRequest": "from CHF {individuell}, fixed price after the concept talk",
    "duration": "Duration",
    "yes": "yes",
    "no": "no"
  }
}

export const projekte = {
  "meta": {
    "title": "Projects: Websites and Web Apps from Zurich | Sin Digital",
    "description": "Three projects, three starting points: a club platform with applications and reservations, an enquiry form for a building services company, a first website for a barber shop. With starting point, solution and result.",
    "ogTitle": "Projects by Sin Digital: websites and web apps from Zurich"
  },
  "breadcrumb": "Projects",
  "label": "Projects",
  "title1": "REAL PROJECTS.",
  "title2": "LIVE ONLINE.",
  "intro": "No mockups, no placeholders: real websites for real businesses, live and open for anyone to see. Starting point, solution, result.",
  "all": "All projects",
  "caseStudy": "Case study",
  "firstSite": "First website",
  "visit": "Open live site",
  "readMore": "Read case study",
  "madeWith": "Built with",
  "clientLabel": "Client",
  "yearLabel": "Year",
  "sections": {
    "situation": "Starting point",
    "solution": "Solution",
    "result": "Result"
  },
  "metrics": {
    "title": "At a glance",
    "tests": "Automated tests",
    "languages": "Languages"
  },
  "compare": {
    "title": "Before / after",
    "before": "Before",
    "after": "After",
    "handle": "Move comparison"
  },
  "tech": "Tech",
  "next": "Next project",
  "cta": {
    "title": "Your project next?",
    "text": "Configure your website in two minutes or get in touch directly.",
    "configure": "To the configurator",
    "contact": "Get in touch"
  },
  "items": {
    "street-food-compassion": {
      "name": "Street Food Compassion",
      "client": "Verein Street Food Compassion, Baden AG",
      "tagline": "Festivals, a Christmas market and an admin area that ends the manual work.",
      "summary": "Web app for club events: vendor applications, online reservations for the fondue chalet and a protected admin area.",
      "situation": "The club had an almost empty WordPress site under its old name. Nothing about the new Badener Weihnachtszauber, and vendors who wanted to take part applied by email, with follow-up questions, attachments and manual work on both sides.",
      "solution": "A web app instead of a brochure: React and Vite on the front end, Spring Boot on the back end. Two worlds with their own mood, street food festivals and Badener Weihnachtszauber, designed with light as the material: warm embers on one side, a winter night among fir trees on the other. Vendors apply in a multi-step form, separated into food and goods, with photo upload and an electricity demand calculator. Guests reserve the fondue chalet online in time slots. In the protected admin area with roles, the club manages applications and reservations, sends mail templates and exports to Excel and PDF. More than 170 automated tests keep everything reliable.",
      "result": "Applications and reservations come together digitally in one place instead of inboxes and Excel lists. The club sees at a glance who is in, and visitors find both events under one name."
    },
    "rh-haustechnik": {
      "name": "RH Haustechnik",
      "client": "RH Haustechnik GmbH, Urdorf",
      "tagline": "From phone call to complete enquiry.",
      "summary": "New static website for a building services company with a detailed enquiry form and spam protection.",
      "beforeAlt": "Old RH Haustechnik website, March 2025",
      "afterAlt": "New RH Haustechnik website, same section",
      "situation": "The previous website was outdated and had no contact form. Anyone who needed something had to call.",
      "solution": "A completely new, fast static website, mobile-optimised and reduced to the essentials. At its heart is a detailed enquiry form: service, type of property, place, address, preferred date and message, sent via EmailJS and protected against spam with Cloudflare Turnstile. Every enquiry lands directly in the company inbox. Hosted on Hostpoint.",
      "result": "Customers submit their enquiry online in a structured way, with everything the company needs for a quote. RH Haustechnik receives complete enquiries and saves follow-up calls."
    },
    "coiffeur-zuerich": {
      "name": "Coiffeur Zürich",
      "client": "Barber shop, Forchstrasse 26, Zurich Seefeld",
      "tagline": "A first website, with appointments online from day one.",
      "summary": "Bilingual website with online booking, price list, gallery and local SEO for a barber shop in Seefeld.",
      "situation": "The barber shop on Forchstrasse in Zurich Seefeld had no website of its own. Anyone looking for the salon found no page showing services, prices and appointments.",
      "solution": "A bilingual website in German and English with online booking, price list, gallery, reviews, location and FAQ. Locally optimised for terms like “Coiffeur Zürich” and “Barber Shop Seefeld”. Built with HTML5, CSS3 and vanilla JavaScript, hosted on Netlify. The contact form is protected against spam with Cloudflare Turnstile and writes enquiries straight into Google Sheets.",
      "result": "The salon can be found online for the first time, also by English-speaking clients, and appointments can be booked directly, around the clock."
    }
  }
}

export const websiteCheck = {
  "meta": {
    "title": "Website Check: How Fast and Visible Is Your Website? | Sin Digital",
    "description": "Free website check with Google PageSpeed Insights: performance, SEO, accessibility and best practices of your site as scores, plus three concrete tips. No sign-up.",
    "ogTitle": "Website check: how fast and visible is your website?"
  },
  "breadcrumb": "Website check",
  "label": "Website check",
  "title1": "HOW GOOD IS",
  "title2": "YOUR WEBSITE?",
  "intro": "Enter a URL and Google measures your site on a simulated smartphone. You get four scores and three tips you can understand without a degree in engineering. Free, no sign-up.",
  "form": {
    "label": "Address of your website",
    "placeholder": "www.your-website.ch",
    "submit": "Check website",
    "checking": "Checking …",
    "invalid": "Please enter a valid address, for example www.your-website.ch."
  },
  "progress": {
    "title": "Google is measuring",
    "seconds": "seconds",
    "phases": [
      "Connecting to PageSpeed Insights",
      "Loading the page on a simulated smartphone",
      "Lighthouse measures performance, SEO and accessibility",
      "Almost done, large pages take longer"
    ],
    "hint": "A measurement usually takes 20 to 40 seconds."
  },
  "result": {
    "title": "Result for",
    "measured": "Google PageSpeed Insights, mobile. Values vary with server and time of day.",
    "scores": {
      "performance": "Performance",
      "accessibility": "Accessibility",
      "bestPractices": "Best practices",
      "seo": "SEO"
    },
    "tipsTitle": "Three tips with the biggest impact",
    "allGood": "Strong site. None of the usual brakes are here; keep it up and measure again after bigger changes.",
    "again": "Check another website",
    "cta": {
      "title": "Want Sin Digital to fix this for you?",
      "text": "We look at the measurement and tell you in a short call what is worth doing and what is not.",
      "button": "Yes, please take a look",
      "secondary": "Or configure a new site"
    }
  },
  "errors": {
    "unreachable": "Google could not load this address. Check the spelling and that the site is publicly reachable.",
    "rateLimit": "Too many checks are running right now. Please try again in a few minutes.",
    "timeout": "The measurement took too long. This happens with very large pages; please try again.",
    "generic": "The measurement failed. Please try again later.",
    "retry": "Try again"
  },
  "tips": {
    "render-blocking-resources": {
      "title": "CSS and scripts block the first paint",
      "text": "Stylesheets and scripts in the head hold the browser back before it shows anything. Inline the critical CSS, load the rest later."
    },
    "uses-responsive-images": {
      "title": "Images are too big for the screen",
      "text": "The site sends desktop-sized images to phones. Proper sizes per device often save more than half the data."
    },
    "modern-image-formats": {
      "title": "Old image formats",
      "text": "JPEG and PNG are much larger than WebP or AVIF at the same quality."
    },
    "unused-javascript": {
      "title": "Lots of JavaScript that is never used",
      "text": "Large script bundles load code this page never runs. Split them and load only what the page needs."
    },
    "unused-css-rules": {
      "title": "CSS with a lot of dead weight",
      "text": "A large part of the stylesheet is not used on this page."
    },
    "uses-text-compression": {
      "title": "Text is delivered uncompressed",
      "text": "HTML, CSS and JavaScript should come gzip- or brotli-compressed from the server; that is a server setting."
    },
    "server-response-time": {
      "title": "The server responds slowly",
      "text": "The first byte takes its time. Hosting, caching or the CMS slow things down before the page even starts."
    },
    "font-display": {
      "title": "Fonts delay the text",
      "text": "Web fonts without font-display keep text invisible until the font has loaded."
    },
    "largest-contentful-paint": {
      "title": "The largest content appears late",
      "text": "The main image or heading takes too long. Preload the image, set its size, remove render blockers."
    },
    "cumulative-layout-shift": {
      "title": "The page jumps while loading",
      "text": "Elements move while images or fonts load. Reserve width and height for images and space for embeds."
    },
    "total-blocking-time": {
      "title": "The page responds with a delay",
      "text": "JavaScript blocks the main thread. Fewer scripts, load later, split up tasks."
    },
    "image-alt": {
      "title": "Images without alternative text",
      "text": "Screen readers and Google do not know what is in the images. Every meaningful image needs an alt attribute."
    },
    "color-contrast": {
      "title": "Not enough contrast",
      "text": "Text is hard to read on its background. At least 4.5:1 for body text."
    },
    "document-title": {
      "title": "Page title missing",
      "text": "The title is the most important thing in search results. Every page needs its own meaningful title."
    },
    "meta-description": {
      "title": "Description for Google missing",
      "text": "Without a meta description Google picks a snippet itself. A good description raises the click rate."
    },
    "link-text": {
      "title": "Links that say nothing",
      "text": "“Click here” tells Google and screen readers nothing. Link texts should describe the target."
    },
    "is-crawlable": {
      "title": "The page locks Google out",
      "text": "A noindex or the robots.txt prevents the page from appearing in search results."
    },
    "viewport": {
      "title": "Not set up for smartphones",
      "text": "Without a viewport setting the phone shows the desktop view, tiny."
    },
    "errors-in-console": {
      "title": "Errors in the browser",
      "text": "The page throws JavaScript errors. Often harmless, sometimes the reason for broken features."
    },
    "is-on-https": {
      "title": "No HTTPS",
      "text": "Without encryption the browser warns and Google ranks the site lower."
    },
    "target-size": {
      "title": "Buttons too small",
      "text": "Links and buttons are hard to hit on a phone. At least 24 × 24 pixels with spacing."
    },
    "heading-order": {
      "title": "Headings in the wrong order",
      "text": "Skipped heading levels confuse screen readers and search engines."
    }
  },
  "about": {
    "title": "What the website check tests",
    "items": [
      {
        "title": "Performance",
        "text": "How quickly your page becomes visible and usable on a phone with an average connection."
      },
      {
        "title": "SEO",
        "text": "Whether Google can read, understand and classify the page: title, description, links, mobile friendliness."
      },
      {
        "title": "Accessibility",
        "text": "Whether people with a screen reader, keyboard or weak eyesight can use the page."
      },
      {
        "title": "Best practices",
        "text": "Security, current technology, no errors in the browser."
      }
    ],
    "note": "The measurement runs at Google (PageSpeed Insights). Sin Digital stores neither your address nor the result."
  }
}

export const wartung = {
  "meta": {
    "title": "Maintenance & Hosting: Care from CHF {care} per Month | Sin Digital",
    "description": "Three maintenance plans for your website: hosting, security, updates, backups, monitoring, changes and fixed reply times. The first {months} months are included in every website package, then from CHF {care} per month.",
    "ogTitle": "Maintenance & hosting: care from CHF {care} per month"
  },
  "breadcrumb": "Maintenance",
  "label": "Maintenance & hosting",
  "title1": "BUILT",
  "title2": "AND LOOKED AFTER.",
  "intro": "A website is not a project that ends. Updates, backups, monitoring and small changes: three plans, clearly defined. The first {months} months are included in every website package, after that you choose how much care you want.",
  "billing": {
    "label": "Billing",
    "monthly": "Monthly",
    "yearly": "Yearly",
    "perMonth": "per month",
    "perYear": "per year",
    "save": "{months} months free",
    "equals": "equals CHF {price} per month"
  },
  "choose": "Request plan",
  "includesAll": "Everything in {plan}, plus",
  "plans": {
    "basis": {
      "tagline": "The basics: your website stays online, up to date and backed up."
    },
    "business": {
      "tagline": "For businesses whose website brings in enquiries and must not stand still."
    },
    "premium": {
      "tagline": "For everyone who changes things regularly and expects a quick reply."
    }
  },
  "rows": {
    "hosting": "Hosting",
    "updates": "Security & updates",
    "monitoring": "Monitoring",
    "backups": "Backups",
    "changeMinutes": "Changes per month",
    "response": "Reply within",
    "report": "Report"
  },
  "values": {
    "hosting": {
      "true": "included"
    },
    "updates": {
      "security": "security updates"
    },
    "monitoring": {
      "uptime": "uptime",
      "performance": "uptime and loading time"
    },
    "backups": {
      "weekly": "weekly",
      "daily": "daily"
    },
    "changeMinutes": {
      "0": "none, CHF {hourly} per hour",
      "30": "30 minutes",
      "60": "60 minutes"
    },
    "response": {
      "threeDays": "3 working days",
      "twoDays": "2 working days",
      "oneDay": "1 working day"
    },
    "report": {
      "none": "–",
      "quarterly": "quarterly",
      "monthly": "monthly"
    }
  },
  "compareTitle": "The plans side by side",
  "note": {
    "before": "The first {months} months of maintenance are included in every website package: landing page Basic, one-pager and company website Business. After that maintenance is optional; website, code and domain are yours. Configure a new website in the ",
    "link": "configurator",
    "after": "."
  },
  "conditionsTitle": "The terms, in short",
  "conditions": [
    "Yearly price: {paidMonths} instead of 12 months, so {freeMonths} months free.",
    "A yearly subscription renews by {renewal} months unless cancelled. You get a reminder {reminderDays} days beforehand. There is no pro-rata refund.",
    "Unused minutes expire at the end of the month.",
    "Reply means getting back to you within the stated working days, not completed work.",
    "During announced holidays the reply times pause.",
    "The first {months} months of maintenance are included in every website package: landing page Basic, one-pager and company website Business.",
    "Minimum term {minMonths} months including these {months} months, then {noticeDays} days' notice to the end of a month.",
    "Changing the plan does not start a new term.",
    "Prices stay fixed for {priceFixedMonths} months, changes are announced {priceChangeNoticeMonths} months ahead."
  ],
  "faqTitle": "Questions about care",
  "faq": [
    {
      "q": "What does the care include?",
      "a": "Depending on the plan: hosting, security and updates, uptime monitoring, backups, from Business an allowance for small changes such as new texts, images or opening hours, plus a report. And a fixed reply time when something does not work."
    },
    {
      "q": "How long does the contract run, and how can I cancel?",
      "a": "The minimum term is {minMonths} months from acceptance of your website, the {months} included months count towards it. After that you cancel with {noticeDays} days' notice to the end of a month. A yearly subscription runs until the end of the paid year and renews by {renewal} months unless you cancel. I remind you {reminderDays} days beforehand."
    },
    {
      "q": "Can I change the plan later?",
      "a": "Yes, at any time for the following month. A change does not start a new term. With yearly payment, a smaller plan applies from the next paid year."
    },
    {
      "q": "What if my change requests exceed the included time?",
      "a": "I tell you beforehand. Additional work costs CHF {hourly} per hour, larger changes get a separate quote. Unused minutes expire at the end of the month."
    },
    {
      "q": "Do I need a plan if Sin Digital built my website?",
      "a": "The first {months} months are included in every website package. After that maintenance is optional: website, code and domain are yours. Without a plan, hosting, updates and backups are with you or your provider."
    },
    {
      "q": "Does Sin Digital also look after websites someone else built?",
      "a": "Usually yes. I take a short look at the technology and tell you whether and in which plan care makes sense."
    },
    {
      "q": "How fast does Sin Digital react when the website is down?",
      "a": "Within the reply time of your plan: at the latest after 3 working days on Basic, 2 working days on Business and 1 working day on Premium. Reply means: I get back to you and start the analysis. Working days are Monday to Friday, excluding public holidays in the canton of Zurich. During announced holidays the reply times pause."
    },
    {
      "q": "Where is the site hosted, and who owns the data?",
      "a": "With established providers such as Hostpoint or Netlify, matching the project. Domain, content and data belong to you. If you cancel, you receive your website files and access details free of charge."
    },
    {
      "q": "How is it billed?",
      "a": "Monthly or yearly by invoice, paid by bank transfer or TWINT. With yearly billing you pay {paidMonths} instead of 12 months."
    }
  ]
}
