const data = [
    { id: '0', question: 'Cantidad de comensales', options: null , free: true },
    { id: '1', question: 'Es usted vegano,vegetariano o keto',options: ['Vegano', 'Vegetariano'] , free: false},
    { id: '2', question: 'Sos alergico al mani', options: ['Si','No'] , free: false },
    { id: '3', question: 'Sos alergico a los mariscos', options: ['Si','No'] , free: false },
    { id: '4', question: 'Sos alergico a los lacteos', options: ['Si','No'] , free: false },
    { id: '5', question: 'Sufris de hipertencion:', options: ['Si','No'] , free: false },
    { id: '6', question: 'Sufris de diabetis:', options: ['Si','No'] , free: false },
  ];

const days_equiv = [
  {
    id: 0, day: 'lunes'
  },
  {
    id: 1, day: 'martes'
  },
  {
    id: 2, day: 'miercoles'
  },
  {
    id: 3, day: 'jueves'
  },
  {
    id: 4, day: 'viernes'
  },
  {
    id: 5, day: 'sabado'
  },
  {
    id: 6, day: 'domingo'
  }

]

const misConst= {data, days_equiv}
export default misConst;