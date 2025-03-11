const PaymentController = {

    async createPayment(req, res){
        try {   
            const { data, recibo, valor, observação} = req.body;
            return res.status(201).json({message: 'Payment created', dataReq: {data, recibo, valor, observação}});            
        } catch (error) {
            return res.status(500).json({message: 'Internal server error'});
        }
    },


};

export default PaymentController;