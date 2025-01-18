import { supabase } from "../supabase"

export async function getVehicles() {
    console.log('getVehicles');
    
    const { data, error } = await supabase
        .from('Vehicles')
        .select('*')
    if (error) {
        console.log({error});
        throw error
    }
    console.log({data});
    
    return data
}