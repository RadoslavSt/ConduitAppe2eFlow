

export const HeaderValidation = (datass, expectedNavItem) => {
  datass.each((datas, index) => {
    console.log(datas);
   cy.wrap(datas[0]).should("contain", expectedNavItem[index]);
  });
};

export const typeCredentials=(inputs, credentials)=>{
  inputs.each((input,index)=>{
    console.log(input)
    cy.wrap(input).type(credentials[index])
    
  })
}

export const createArticle = (inputs, datas)=>{
  inputs.each((input,index)=>{
    cy.wrap(input).type(datas[index])
  })
}

export const createArticle2 = (inputs,datas)=>{
  inputs.each((input,index)=>{
    cy.wrap(input).clear().type(datas[index])
  })
}

