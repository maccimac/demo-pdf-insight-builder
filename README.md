
# PDF Insight Builder
Margaret Macaranas 2025
for http://pdf.com

- [Working project link](https://demo-pdf-insight-builder.vercel.app/)
- [Github link](https://github.com/maccimac/demo-pdf-insight-builder)
- [Figma link](https://www.figma.com/design/PSDK2Erg1BhH438cp9lAbW/PDF-Insight-Builder?node-id=4-848&t=JXtrETFY8kQH5lA3-1)
- [Figma clickable prototype](https://www.figma.com/proto/PSDK2Erg1BhH438cp9lAbW/PDF-Insight-Builder?node-id=22-1883&p=f&t=w8l1GcnDeawTt4FX-1&scaling=min-zoom&content-scaling=fixed&page-id=0%3A1&starting-point-node-id=22%3A1883)
- [UI/UX Documentation](https://docs.google.com/document/d/1R4BtnuOVYcoHZ91pmDuILZ6yUAkgZ8X_L7HErIE0o2U/edit?usp=sharing)

# How to run the project
Very straightforward. From root, 
1. `npm i`
2. `npm run start`
(Runs at localhost:3000)
3. For a more convenient buildingm use `npm run sass` run initialize sass compiling


#  UX + technical architecture choices
- Use of MU and Recharts
- This app is a one-page web application (`App.tsx` > `Home.tsx`). Routing is available but only used for Home.js.
- We use 2 main parent component `YourData.tsx` and `YourInsights.tsx`: 
   - `YourData.tsx ` (top section)  
        - `DatasetSelector.tsx`
        - `DatasetTableWrapper.tsx`
            - `DatasetFilters.tsx`
            - `DatasetTable.tsx`             
   - `YourInsight.tsx` (lower section)
        - `InsightView.tsx` (charts)
        - `InsightDesigner.tsx` (chart design form; saved views)
- Mock datas are stored in `/mock-data`
    - There are mocks for 50, 100, 200, and 500 rows which we can mix and match
    - Meta data of datasets are on `mock-data/datasets.ts`
- Component that cen be regularly reused are found in `/components` directory
    - ex: `PdfButton.tsx`, `PdfCustomTooltip.tsx` (tooltip for charting), `PdfSelector.tsx`
- Global data are store in `contexts/DataContext.tsx`
    - General use of `useContext`
    - Some data found here are: 
        - `datasetName` (name of currently selected dataset)
        - filter configs (types, range of date and numbers)
        - xAxis, yAxis, color, 
- `LocalStorage` is used to save views
    - localStorage key: `pdf_views_list` holds an array of insight views
- Types are stored in `types/index.ts`
- Utility files:
    - colors (from figma)
    - formatting date, sorting and filtering
    - `semiconductorProps.ts` - labelling for column keys
        ex: `life_span_years` = label: 'Lifespan', unit: 'year/s'
- Styles are also divided into
    - Modules: 1. `your-data.scss` ; 2. `your-insight.scss`
    - Utils - colors.scss, typography.scss, etc
- Additional packages: 
    - `react-color` for color picker
    - `@mui/x-date-pickers` for date picker
    - `react-app-rewired` for aliasing using @
        ex: import colors from `@utils/colors.js`


# What you’d improve with more time 
- Add dark-mode
- Add ability to input additional lines for the chart
- Add options of more compatible colors
- Can upload dataset in csv or json for processing
- Smaller modularization of components
