import loans from "../models/loans.js";



export const getLoans = async (req,res) => {
    const {status} = req.query;
    let statuses = ["pending","active"]
    
    try {
      
      if (status && !statuses.find(status)) {
        return res.status(404).json({ message: "That status doesnt exist" });
      }else{
        loans = loans.map(l => l.status === status)
      }


      res.status(200).json({ data: loans });
    } catch (err) {
      res.status(500).json({ message: "Something went wrong" });
    }

}



