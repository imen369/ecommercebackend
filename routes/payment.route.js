const express=require('express');
const router = express.Router();
const stripe = require ('stripe');
const Stripe =
stripe('sk_test_51NnLqSBOa5nwApU3a9d8C0QGTwD2lp2h3KYmQFwbPqJULm1xq0Ja3e2kzCeVaZRPjykHhlZMaGVzScqRByB9R4PC00fi3pTiCD');
router.post('/', async (req, res) => {
let status, error;
const { token, amount } = req.body;
try {
await Stripe.charges.create({
source: token.id,
amount,
currency: 'usd',
});
status = 'success';
} catch (error) {
console.log(error);
status = 'Failure';
}
res.json({ error, status });
});
module.exports = router;