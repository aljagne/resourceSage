# Subscription Email Analysis

This document outlines the initial analysis of subscription email patterns to facilitate automated data extraction.

## Common Elements:

*   **Subject Line:** Often includes keywords like "Subscription," "Invoice," "Receipt," "Renewal."
*   **Sender:** Typically from the service provider (e.g., "notifications@hubspot.com").
*   **Body Content:**
    *   Includes subscription details (plan name, cost, billing period, renewal date, users).
    *   Often has a table or structured format for payment info.
    *   May contain links to billing dashboards or manage subscriptions pages.

## Examples:

*   **HubSpot:**
    *   **Subject:** "Your HubSpot Invoice" or "Subscription Renewal"
    *   **Sender:** "@hubspot.com" or similar.
    *   **Content:** Has a clear table with subscription details and a payment breakdown.

*   **Asana:**
    *   **Subject:** "Your Asana Invoice"
    *   **Sender:** "@asana.com" or similar.
    *   **Content:** Has a payment summary with details in a link

*   **Trello:**
    *   **Subject:** "Your Invoice"
    *   **Sender:** "@trello.com" or similar.
    *   **Content:** Has a payment summary with details in a link

## Next Steps

*   Gather more example emails from various SaaS providers.
*   Define regex patterns or NLP extraction strategies for each provider.
*   Start implementing the email parsing logic.
