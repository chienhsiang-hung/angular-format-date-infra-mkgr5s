import { Component } from '@angular/core';
import { formatDate } from '@angular/common';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  tokenAcceso: any;
  token: string;
  userApi: string = 'test@hugoapp.com';
  passwordApi: string = 'Temporal$123';
  partnerIdApi: string = 'GK13Sd7YSq';
  partnerIdApi2: string = 'GK13Sd7YSq';
  partnerKeyApi: string = '2kjSejYhU53g6sqQ';
  territoryIdApi: string = '5a2c2234458f8704965563de';
  locationIdApi: string = 'Ob4qw5csDx';
  locationIdApi2: string = '5BcuGMA6PR';

  producto: string = '5cc35685deff7f3ad13168a5';

  urlApi: string = 'https://api-integraciones-integraciones.hugoapp.dev/api/v1/';

  constructor(private http: HttpClient) {}

  postToken() {
    this.http
      .post<any>(this.urlApi + 'partners/tokens', {
        'Accept-Language': 'en',
        username: this.userApi,
        password: this.passwordApi,
      })
      .subscribe((data) => {
        this.tokenAcceso = data;
        this.token = this.tokenAcceso.data.access_token;
        console.log('token: ', this.token);
        console.log('token completo: ', this.tokenAcceso);
      });
  }

  getInfoComercio() {
    this.http
      .get(this.urlApi + 'partners/' + this.partnerIdApi, {
        headers: {
          Authorization: `Bearer ${this.token}`,
          'Accept-Language': 'en',
          'partner-key': this.partnerKeyApi,
        },
      })

      .subscribe((data) => {
        var aux: any = data;
        console.log('info comercio: ', aux);
      });
  }
  getTiempoPreparacion() {
    this.http
      .get(
        this.urlApi +
          'partners/eaolv2zLJK/delivery-times?territoryId=' +
          this.territoryIdApi,
        {
          headers: {
            Authorization: `Bearer ${this.token}`,
            'Accept-Language': 'en',
            locationId: this.locationIdApi,
          },
        }
      )
      .subscribe((data) => {
        var aux: any = data;
        console.log('tiempo preparacion: ', aux);
      });
  }
  putActualizarInformacionProducto() {
    this.http
      .put(
        this.urlApi + 'products/5cc35685deff7f3ad13168a5?locationId=5BcuGMA6PR',
        {
          enabled: true,
        },
        {
          headers: {
            Authorization: `Bearer ${this.token}`,
            'Accept-Language': 'en',
          },
        }
      )
      .subscribe((data) => {
        var aux: any = data;
        console.log('actualizar informacion producto: ', aux);
      });
  }
  putActualizarInformacionItemOpcionProducto() {
    this.http
      .put(
        this.urlApi +
          'products/5cc35685deff7f3ad13168a5/options/5cc35698deff7f3ab0163457/items/5cc356a7deff7f3ac2411cc5?locationId=5BcuGMA6PR',
        {
          enabled: false,
        },
        {
          headers: {
            Authorization: `Bearer ${this.token}`,
            'Accept-Language': 'en',
          },
        }
      )
      .subscribe((data) => {
        var aux: any = data;
        console.log('actualizar informacion item opcion producto: ', aux);
      });
  }
  getOpcionesProducto(productId, locationId) {
    this.http
      .get(
        this.urlApi +
          'products/' +
          productId +
          '/options?locationId=' +
          locationId,
        {
          headers: {
            Authorization: `Bearer ${this.token}`,
            'Accept-Language': 'en',
          },
        }
      )
      .subscribe((data) => {
        var aux: any = data;
        console.log('opciones producto: ', aux);
      });
  }
  postCreacionActualizacionProductos() {
    this.http
      .post(
        this.urlApi + 'products?partnerId=GK13Sd7YSq',
        {
          products: [
            {
              sku: '123456789',
              sort: '99',
              name: 'Bebida Nesquik Polvo  Fresa Lata 400 g',
              price: '165.00',
              description:
                'Nesquik Sabor Fresa es un polvo para preparar bebida instant\u00e1nea sabor a fresa, con una\u00a0selecci\u00f3n \u00fanica de nutrientes que complementa los beneficios de la leche\u00a0para brindar a los ni\u00f1os lo que necesitan en su crecimiento y\u00a0desarrollo.',
              extra_info: '',
              taxonomies: ['60d518d0472b7670110bb7d4'],
            },
          ],
        },
        {
          headers: {
            Authorization: `Bearer ${this.token}`,
            'Accept-Language': 'en',
          },
        }
      )
      .subscribe((data) => {
        var aux: any = data;
        console.log('creacion actualizacion producto: ', aux);
      });
  }
  postActualizacionPrecios() {
    this.http
      .post(
        this.urlApi + 'products?partnerId=GK13Sd7YSq',

        {
          type: 'price',
          products: [
            {
              sku: 'PRUEBA03',
              locations: [
                {
                  location: 'fLwCLYThOP',
                  price: 100.0,
                },
              ],
            },
            /*  {
              sku: 'PRUEBA02',
              locations: [
                {
                  location: 'fLwCLYThOP',
                  price: 91.3778,
                },
                {
                  location: 'R2jxQfPKUd',
                  price: 91.3778,
                },
              ],
            }, */
          ],
        },
        {
          headers: {
            Authorization: `Bearer ${this.token}`,
            'Accept-Language': 'en',
          },
        }
      )
      .subscribe((data) => {
        var aux: any = data;
        console.log('actualizacion precios: ', aux);
      });
  }
  postActualizacionInventario() {
    this.http
      .post(
        this.urlApi + 'products?partnerId=GK13Sd7YSq',
        {
          type: 'inventory',
          products: [
            {
              sku: 'PRUEBA02',
              qty: [
                {
                  fLwCLYThOP: 8,
                },
              ],
              toggle_mode: false,
            },
            {
              sku: 'PRUEBA03',
              qty: [
                {
                  fLwCLYThOP: 7,
                  R2jxQfPKUd: 8,
                },
              ],
              toggle_mode: false,
            },
          ],
        },
        {
          headers: {
            Authorization: `Bearer ${this.token}`,
            'Accept-Language': 'en',
          },
        }
      )
      .subscribe((data) => {
        var aux: any = data;
        console.log('Actualizacion Inventario: ', aux);
      });
  }
  postPrecioProductosOtraMoneda() {
    this.http
      .post(
        this.urlApi + 'products?partnerId=GK13Sd7YSq',
        {
          type: 'currency',
          products: [
            {
              product_code: '01039',
              price_base_wo_iva: 15.74,
              price_base_w_iva: 18.1,
              iva_price: 2.36,
              price_local: 615.4,
              currency_local: 'NIO',
              currency_base: 'USD',
              exchange_rate: 34.0,
            },
            {
              product_code: '01035',
              price_base_wo_iva: 15.74,
              price_base_w_iva: 18.1,
              price_local: 614.5,
              iva_price: 2.36,
              currency_local: 'NIO',
              currency_base: 'USD',
              exchange_rate: 33.95,
            },
          ],
        },
        {
          headers: {
            Authorization: `Bearer ${this.token}`,
            'Accept-Language': 'en',
          },
        }
      )
      .subscribe((data) => {
        var aux: any = data;
        console.log('precio producto otra moneda: ', aux);
      });
  }
  putDesactivarProductosPorSKU() {
    this.http
      .put(
        this.urlApi + 'products?partnerId=PhahsPyvOt',
        {
          type: 'deactivate',
          productsSku: ['7461755100651', '022400651613'],
        },
        {
          headers: {
            Authorization: `Bearer ${this.token}`,
            'Accept-Language': 'en',
          },
        }
      )
      .subscribe((data) => {
        var aux: any = data;
        console.log('desactivar productos por sku: ', aux);
      });
  }
  putActualizarInformacionSucursal() {
    this.http
      .put(
        this.urlApi + 'locations/5BcuGMA6PR',
        {
          available: true,
        },
        {
          headers: {
            Authorization: `Bearer ${this.token}`,
            'Accept-Language': 'en',
          },
        }
      )
      .subscribe((data) => {
        var aux: any = data;
        console.log('actualizar informacion sucursal: ', aux);
      });
  }
  getProductosPartnerSucursal() {
    this.http
      .get(this.urlApi + 'locations/5BcuGMA6PR/products?partnerId=F0oMVuUS2i', {
        headers: {
          Authorization: `Bearer ${this.token}`,
          'Accept-Language': 'en',
        },
      })
      .subscribe((data) => {
        var aux: any = data;
        console.log('productos partner sucursal: ', aux);
      });
  }
  postRealizarLlamadaACentral() {
    this.http
      .post(
        this.urlApi +
          'locations/wytVCVWHl7/callrequest?partnerId=GK13Sd7YSq&orderId=7t7Rd7nnw0&territoryId=5a2c2234458f8704965563de',
        {},
        {
          headers: {
            Authorization: `Bearer ${this.token}`,
            'Accept-Language': 'en',
          },
        }
      )
      .subscribe((data) => {
        var aux: any = data;
        console.log('realizar llamada a central: ', aux);
      });
  }
  getOrdenesPendientes() {
    this.http
      .get(
        this.urlApi +
          'locations/5BcuGMA6PR/pending-orders?partnerId=eaolv2zLJK',
        {
          headers: {
            Authorization: `Bearer ${this.token}`,
            'Accept-Language': 'en',
          },
        }
      )
      .subscribe((data) => {
        var aux: any = data;
        console.log('ordenes pendientes: ', aux);
      });
  }
  getRazonesParaRechazarOrden() {
    this.http
      .get(this.urlApi + 'orders/rejection-reasons', {
        headers: {
          Authorization: `Bearer ${this.token}`,
          'Accept-Language': 'en',
        },
      })
      .subscribe((data) => {
        var aux: any = data;
        console.log('razones para rechazar orden: ', aux);
      });
  }
  putDespacharOrdenEnBaseId() {
    this.http
      .put(
        this.urlApi + 'orders/ZsrXp0D51r?partnerId=eaolv2zLJK',
        {
          status: 'delivered',
        },
        {
          headers: {
            Authorization: `Bearer ${this.token}`,
            'Accept-Language': 'en',
          },
        }
      )
      .subscribe((data) => {
        var aux: any = data;
        console.log('despachar orden por id: ', aux);
      });
  }
  putRechazarOrdenEnBaseId() {
    this.http
      .put(
        this.urlApi + 'orders/ZsrXp0D51r?partnerId=eaolv2zLJK',
        {
          status: 'rejected',
          reason: 'Producto no disponible',
        },
        {
          headers: {
            Authorization: `Bearer ${this.token}`,
            'Accept-Language': 'en',
          },
        }
      )
      .subscribe((data) => {
        var aux: any = data;
        console.log('rechazar orden por id: ', aux);
      });
  }
  putAceptarOrdenEnBaseId() {
    this.http
      .put(


        
        this.urlApi + 'orders/ZsrXp0D51r?partnerId=eaolv2zLJK',
        {

          tatus: "accepted",
          
      },
        {
          headers: {
            Authorization: `Bearer ${this.token}`,
            'Accept-Language': 'en',
          },
        }
      )
      .subscribe((data) => {
        var aux: any = data;
        console.log('aceptar orden por id: ', aux);
      });
  }
  getProductosDeOrden() {
    this.http
      .get(this.urlApi + 'orders/ZsrXp0D51r/products?partnerId=eaolv2zLJK',
       {
        headers: {
          Authorization: `Bearer ${this.token}`,
          'Accept-Language': 'en',
        },
      })
      .subscribe((data) => {
        var aux: any = data;
        console.log('productos de orden: ', aux);
      });
  }
  getInformacionDeOrdenPorID() {
    this.http
      .get(this.urlApi + 'orders/ZsrXp0D51r',
       {
        headers: {
          Authorization: `Bearer ${this.token}`,
          'Accept-Language': 'en',
        },
      })
      .subscribe((data) => {
        var aux: any = data;
        console.log('informacion de orden por ID: ', aux);
      });
  }
  getWebhookSucursal() {
    this.http
      .get(this.urlApi + 'locations/E6AYsLK0Sd/webhooks?partnerId=eaolv2zLJK',
       {
        headers: {
          Authorization: `Bearer ${this.token}`,
          'Accept-Language': 'en',
        },
      })
      .subscribe((data) => {
        var aux: any = data;
        console.log('webhook sucursal: ', aux);
      });
  }
  postWebhookEnviarOrdenComercio() {
    this.http
      .post(
        this.urlApi + 'orders/vlXIr3lnYq/webhooks',
        {},
        {
          headers: {
            Authorization: `Bearer ${this.token}`,
            'Accept-Language': 'en',
          },
        }
      )
      .subscribe((data) => {
        var aux: any = data;
        console.log('webhook enviar orden comercio: ', aux);
      });
  }
  putActualizarWebhookUrlPartner() {
    this.http
      .put(
        this.urlApi + 'locations/drSlm0PWnv/webhooks?partnerId=GK13Sd7YSq',
        {
          "url":"https://i.sirena.dev/ud/hugo-app"
      },
        {
          headers: {
            Authorization: `Bearer ${this.token}`,
            'Accept-Language': 'en',
          },
        }
      )
      .subscribe((data) => {
        var aux: any = data;
        console.log('actualizar webhook url partner: ', aux);
      });
  }
  deleteEliminarWebhook() {
    this.http
      .delete(
        this.urlApi + 'locations/E6AYsLK0Sd/webhooks?partnerId=eaolv2zLJK',       
        {
          headers: {
            Authorization: `Bearer ${this.token}`,
            'Accept-Language': 'en',
          },
        }
      )
      .subscribe((data) => {
        var aux: any = data;
        console.log('elimina webhook: ', aux);
      });
  }
  postDetalleOrdenWebhook() {
    this.http
      .post(
        this.urlApi + 'orders/VjHMsWX4yY/build-params',        
        {
          headers: {
            Authorization: `Bearer ${this.token}`,
            'Accept-Language': 'en',
          },
        }
      )
      .subscribe((data) => {
        var aux: any = data;
        console.log('detalle orden webhook: ', aux);
      });
  }
}
