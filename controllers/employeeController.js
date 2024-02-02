const Employee = require('../models/employeeModel')

// show the list of employees
 
const index = (req, res, next)=>{

    Employee.find()
    .then(response=>{
res.json({response})
    }).catch(error=>{
        res.json({message: error})
    })
}

//show single employee
const show= (req, res, next)=>{
    let employeeID= req.body.employeeID
    Employee.findById(employeeID)
    .then(response=>{
        res.json({response})
        .catch(error=>{
            res.json({
                message:'could not find specific employee'
            })
        })
    })
}

// add employee to database
let add = (req, res, next)=>{
    let newEmployee= new Employee({
        name: req.body.name,
        designation: req.body.designation,
        email: req.body.email,
        phone:req.body.phone,
        age: req.body.age
    })
    newEmployee.save()
    .then(response=>{
        res.json({
            message:'Employee added successfully'
        })
    }).catch(error=>{
        res.json({
            message:'something went wrong'
        })
    })
}

// udate employee data

const update = (req, res, next)=>{
    let employeeID= req.body.employeeID
    let updateEmployee= {
        name: req.body.name,
        designation: req.body.designation,
        email: req.body.email,
        phone: req.body.phone,
        age: req.body.age
    }
    Employee.findByIdAndUpdate(employeeID, {$set: updateEmployee})
.then(()=>{
    res.json({
        message: 'Employee updated successfully'
    })
}).catch(error=>{
    res.json({
        message: 'Unable to udate employee'
    })
})
}

// delete an emloyee

const destroy= (req, res, next)=>{
    let employeeID = req.body.employeeID
    Employee.findByIdAndDelete(employeeID)
    .then(()=>{
        res.json({
            message: 'employee deleted successfully'
        })
    }).catch(error=>{
        res.json({
            message:'Unable to delete employee'
        })
    })
}

module.exports={
    index, show, add, update, destroy
}