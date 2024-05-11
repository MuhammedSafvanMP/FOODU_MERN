import React, { useContext } from 'react'
import { globalContext } from '../context/GlobalContext';

export default function RevanueProducts() {
    const [
        handleAdd,
        handleLike,
        filteredData,
        setFilteredData,
        user,
        setUser,
        search,
        setSearch,
        handleSignup,
        show,
        setShow,
        products,
        setProducts,
      ] = useContext(globalContext);

      
  return (
    <>
    <section class="content-info">
   <div class="container paddings-mini">
      <div class="row">
         <div class="col-lg-12">
            <table class="table-striped table-responsive table-hover result-point">
               <thead class="point-table-head">
                  <tr>
                     <th class="text-left">No</th>
                     <th class="text-left">Image</th>
                     <th class="text-center">title</th>
                     <th class="text-center">Price</th>
                     <th class="text-center">stock</th>
                   
                  </tr>
               </thead>
               <tbody class="text-center">
               

{
products &&
    products?.map((product, index) => {
        return(

            <>
                   <tr>
                     <td class="text-left number">{index + 1}<i class="fa fa-caret-up" aria-hidden="true"></i></td>
                     <td class="text-left">
                        <img width={"100px"} src={product.productImg} alt="product_image" />
                     </td>
                     <td>{product.title}</td>
                     <td>{product.price}</td>
                     <td>{product.stock}</td>
                
                    
                  </tr>
            </>

        )
    })

               
               
               }


               
                  
                  
        
               </tbody>
            </table>
         </div>
      </div>
   </div>
   
</section>
    </>
  )
}
