# Welcome to Tradetivity, our Capstone Project!

Together, we can democratize trading strategies with transparency for all.

Our intended user is someone who is curious about the financial markets, while wanting to ascertain the same strategies our country’s politicians use for their personal portfolios.

In 2022, out of the 131 members of congress that disclosed their trading reports, they on average beat the S&P 500 by an average of 17.3%; with the highest return being +51.6% (benzinga).

By creating a simplistic, user friendly version of trade watchers for amateur traders, or curious individuals. We hope to bridge the information gap elected officials have.

Enjoy!

## Documentation

### Prisma

Installed and utilized `prisma` for our database and schema.

```bash
npm install @prisma/client
```

### CSV-Parser

Installed `csv-parser` to utilize csv files in seeding the backend.

```bash
npm install csv-parser
```

The parser was used in our `csv_files` folder located within `server/api` folder. These files were collected and created from different sources located:

- Our articles were sourced from [Marketaux](https://www.marketaux.com/) and are updated daily.
- Our live trading data was sourced from [Quiver Quant](https://api.quiverquant.com/docs/#/) and is updated daily.
- Our list of current Congressional members were seeded from [LegiScan](https://legiscan.com/).
- Our data for lobbying was obtained from [ProPublica](https://www.propublica.org).
- Our data for S&P 500 was obtained from [Datahub](https://datahub.io/core/s-and-p-500-companies).

### Recharts

Installed `recharts`, a React library, for use in data visualization.

```bash
npm install recharts
```

## Usage

### Home

The homepage consists of the data collected and stored and accessed from the `/articles` endpoint which was created in the backend on our `server`, the live congress trading that is accessed and stored from `/quiverquant` endpoint, and a treemap graph that utilizes `chart.js` to visualize the hardcoded data we collected on trading volume by sector over the last three years.

### Politicians

The politicians page is located on the `/politicians` endpoint and is a main feature of the application. Here we show cards of politicians that are being rendered from `PoliticianCards.jsx` which hold key data for identifying each politician.

Each card will have have a `more info` button that will take you to `/politician/:id` which holds that politicians `PoliticianDetails.jsx` displaying a larger set of data for the specific politician.

If a client has made an account and is logged in they will also be able to see a `Follow` button that will `post` the politician to the specific `userId` by using the `/politicians/:userId/add-follow/:politicianId` endpoint. Subsequently, if the user is following a politician that they no longer wish to follow they may click the `Unfollow` button on the card that has since switched from the previous `Follow` button.

### Politician Details

This page serves as more detailed look into a single politician. It is accessed via the `/politicians/:id` endpoint. Here you can view the individuals recent trades that are being rendered from the `PoliticianRecentTrade.jsx` component. This component uses an RTK query for the `/house`, `/senate`, and `/politicians/:id` to `GET` the data stored in our backend and match transactions from the politician to the data being collected from our api's.

Here you can also `Follow` and `Unfollow` politicians.

There is also a function `checkActivity()` being run from the `TradeActivityChecker.jsx` component that will filter through the data from the RTK queries above transactions list and return whether the politician is active or inactive based on if they have any transactions.

### Companies

This page contains a list of all the companies that are stored in our `server` that are accessed by using the `/companies` endpoint in an RTK query.

Similarly to the politicians card the `CompanyCard.jsx` component renders the crucial data for each company using the RTK query.

Each card will have have a `more info` button that will take you to `/company/:id` which holds that politicians `Company.jsx` displaying a larger set of data for the specific politician.

`CompanyCard.jsx` also renders the individual company once the `more info` button is clicked.

### Companies Details

The details page is rendered once the user clicks the `more info` button on the `CompanyCard`. On this page we access data being fetched from the `/company/:companyId` express endpoint. It also displays the recent trades the company has by obtaining data from the `/quiverquant/csv` endpoint.

## Updates

We hope to continue to update this application to provide more information on members of Congress over time.

Future Updates May Include:

- Lobbying
- Bills

## Contributing

Our team consists of four Fullstack Academy students/soon-to-be graduates:

Allegra M. || John W. || William C. || Brian C.
