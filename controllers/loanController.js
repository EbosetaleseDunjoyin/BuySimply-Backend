import loans from "../models/loans.js";



export const getLoans = async (req,res) => {
    const {status} = req.query;
    let statuses = ["pending","active"]
    
     try {
       if (status && !statuses.includes(status)) {
         return res.status(404).json({ message: "That status doesn't exist" });
       }

       let filteredLoans = loans;
       if (status) {
         filteredLoans = loans.filter((loan) => loan.status === status);
       }

       let data = filteredLoans.map((loan) => {
         if (req.user.role === "admin" || req.user.role === "superAdmin") {
           return loan;
         } else {
          const { totalLoan, ...applicantWithoutTotalLoan } = loan.applicant;
          return { ...loan, applicant: applicantWithoutTotalLoan };
         }
       });

       res.status(200).json({ data: data });
     } catch (err) {
       res.status(500).json({ message: "Something went wrong" });
     }
}


export const getExpiredLoans = async (req, res) => {
  try {
    const currentDate = new Date();
    const expiredLoans = loans.filter((loan) => {
      const maturityDate = new Date(loan.maturityDate);
      return maturityDate < currentDate;
    });
    let data = expiredLoans.map((loan) => {
      if (req.user.role === "admin" || req.user.role === "superAdmin") {
        return loan;
      } else {
        const { totalLoan, ...applicantWithoutTotalLoan } = loan.applicant;
        return { ...loan, applicant: applicantWithoutTotalLoan };
      }
    });

    res.status(200).json({ data: data });
  } catch (err) {
    res.status(500).json({ message: "Something went wrong" });
  }
};

export const getLoansByEmail = async (req, res) => {
  try {
     const {userEmail} = req.params;
     const userLoans = loans.filter(
       (loan) => loan.applicant.email === userEmail
     );
    
    let data = userLoans.map((loan) => {
      if (req.user.role === "admin" || req.user.role === "superAdmin") {
        return loan;
      } else {
        const { totalLoan, ...applicantWithoutTotalLoan } = loan.applicant;
        return { ...loan, applicant: applicantWithoutTotalLoan };
      }
    });

    res.status(200).json({ data: data });
  } catch (err) {
    res.status(500).json({ message: "Something went wrong" });
  }
};

export const deleteLoanById = async (req, res) => {
  try {
    const { id } = req.params;
    const index = loans.findIndex((loan) => loan.id === id);
    if (index === -1) {
      return res.status(404).json({ message: "Loan not found." });
    }
    loans.splice(index, 1);

    res.status(200).json({  message: `Loan with ${id} deleted` , data: loans });
  } catch (err) {
    res.status(500).json({ message: "Something went wrong" });
  }
};





