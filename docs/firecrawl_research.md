 # Firecrawl Research

This document outlines the initial research on using Firecrawl for web scraping subscription data.

## Firecrawl API:

 *   Firecrawl API takes an URL, crawls it, and converts it into clean markdown.
 *   It has other LLM-ready formats: markdown, structured data, screenshot, HTML, links, metadata
## Approaches

 *   Login with credentials to billing dashboard and extract relevant information using actions.
 *   Find public billing dashboard and extract the information.

## Next Steps

 *    Implement a connection to Firecrawl in the `Subscription Monitor` pipe.
 *    Start using Firecrawl to extract information from one of the selected SaaS providers.
