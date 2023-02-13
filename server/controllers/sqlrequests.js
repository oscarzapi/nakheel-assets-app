export const getSqlRequests = async(req, res) => {
    try {
        console.log('sqlrequests')
        
    } catch (error) {
        res.status(404).json({message:error.message})
    }
} 