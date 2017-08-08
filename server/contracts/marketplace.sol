pragma solidity "0.4.13";

contract MarketPlace{
    string public product;
    function getproduct() constant returns(string){
        return product;
    }

    function setproduct(string _product){
        product = _product;
    }
}