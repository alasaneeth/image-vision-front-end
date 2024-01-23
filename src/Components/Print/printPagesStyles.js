export const pageStyle = {
  a4: `
    @page{
    size: a4;
    margin-right:  60px;
    margin-left: 60px;
    margin-top: 30px;
   
  }`,
  landscape: `
  @page{
    width: '297mm',
    height: '210mm',
    pageBreakAfter: 'always',
    landscape: 'landscape' 
 
}`,
  invoice: ``,
  receipt: `@page{
    size: 80mm 297mm;
    margin-right:  5mm;
  margin-left: 5mm;
  margin-top: -5px;
  margin-bottom: 0;
  background-color:#fff,
  color:#000 
  }`,
  invoiceA4: `
  @page{
  size: a4 ;
  margin-right:  90px;
  margin-left: 90px;
  margin-top: 30px;
 
  }`,
  barcode: `
  @page{
    size: 101.6mm 25.4mm;
    margin-right:  5px;
    margin-left: 5px;
    margin-top: 5px;
    margin-bottom: 5px;
  }`,
};
