# Todos

- UserLoader (on refresh)
- Read Article
- Tag Feed (search)
- Article Edit
- Favorite articles
- Comments


<Ecommerce>
  <Header>
    <Subheader>
      <Cart />
      <Profile/>
    </Subheader>
  </Header>
  <Sidebar>
      <Filter />
      <Category />
  </Sidebar>
  <Products data={} />
  <Footer></Footer>
</Ecommerce>

function Products({data}) {
  return (
    data.map((product) => {
      return <Product data={product} />
    })
  )
}


function Product({data}) {
  const [] =  useState()
  const globalContext = useContext(NeededContext);
  
  return (
    <div>
        <h2>One Product</h2>
        <div>
            <ImageGalleryRelated  product={data} />
            <ProductSpecs />
            <Suppliers />
        </div>
    </div>
  )
}

function ImageGalleryRelated({product}) {
  return (
    <div>

    </div>
  )
}

