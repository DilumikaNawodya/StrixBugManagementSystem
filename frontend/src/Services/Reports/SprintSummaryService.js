import API from '../Base';


export default async function sprintSummary() {
    const response = await API.get('getSprintSummary/');
    const arr = response.data;
    return (arr);
}