import { Product } from '../types';

export const products: Product[] = [
{
  id: 'p-sofa-lima',
  sku: 'SCM-LIV-001',
  name: 'Sofá Lima 3 cuerpos',
  category: 'Living',
  description: 'Tapizado en bouclé avena con patas de nogal macizo.',
  price: 1290000,
  stock: 12,
  image: "/31eb8dd6-14ab-4c5f-8b09-92ce8f65ed40.jpg",

  featured: true
},
{
  id: 'p-mesa-abra',
  sku: 'SCM-COM-014',
  name: 'Mesa Abra 180 cm',
  category: 'Comedor',
  description: 'Nogal macizo con canto biselado, para seis comensales.',
  price: 980000,
  compareAtPrice: 1150000,
  stock: 6,
  image: "/445183ae-ff87-4ea8-9d97-98765de69451.jpg",

  featured: true
},
{
  id: 'p-cama-sierra',
  sku: 'SCM-DOR-007',
  name: 'Cama Sierra queen',
  category: 'Dormitorio',
  description: 'Respaldo tapizado en lino crudo sobre base de roble.',
  price: 1450000,
  stock: 4,
  image: "/bf494ce8-df99-4fa3-9aad-ce989ecd3f3d.jpg",

  featured: true
},
{
  id: 'p-sillon-nube',
  sku: 'SCM-LIV-022',
  name: 'Sillón Nube',
  category: 'Living',
  description: 'Curvas envolventes en bouclé crema y roble natural.',
  price: 690000,
  stock: 18,
  image: "/a30b1da9-7a51-41a5-bca6-3e18f240f976.jpg",

  featured: true
},
{
  id: 'p-aparador-cordoba',
  sku: 'SCM-COM-031',
  name: 'Aparador Córdoba',
  category: 'Comedor',
  description: 'Frentes ranurados en nogal con tiradores de bronce.',
  price: 1120000,
  stock: 3,
  image: "/c59a83e3-e15f-42ff-994e-c54b37e9b07e.jpg",

  featured: false
},
{
  id: 'p-mesa-luz-ronda',
  sku: 'SCM-DOR-018',
  name: 'Mesa de luz Ronda',
  category: 'Dormitorio',
  description: 'Roble macizo con cajón y estante inferior abierto.',
  price: 245000,
  stock: 24,
  image: "/69f16f4e-13cf-46ad-867b-046d23464363.jpg",

  featured: false
},
{
  id: 'p-biblioteca-atlas',
  sku: 'SCM-LIV-040',
  name: 'Biblioteca Atlas',
  category: 'Living',
  description: 'Estructura de hierro negro con estantes de roble claro.',
  price: 815000,
  compareAtPrice: 940000,
  stock: 0,
  image: "/a62c4227-e0f4-4310-9122-7a7d3c8a5a2d.jpg",

  featured: false
}];


export const featuredProducts = products.filter((product) => product.featured);

export const navLinks: {label: string;href: string;}[] = [
{ label: 'Living', href: '#living' },
{ label: 'Comedor', href: '#comedor' },
{ label: 'Dormitorio', href: '#dormitorio' },
{ label: 'Ofertas', href: '#ofertas' }];