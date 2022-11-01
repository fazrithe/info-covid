class SelectCountry extends HTMLElement {
    connectedCallback() {
      this.render();
    }

    set clickEvent(event) {
        this._clickEvent = event;
        this.render();
      }
     
    get value() {
        return this.querySelector('#selectCountry').value;
    }

    render() {
      this.innerHTML = `
        <div class="text-center">
            <h2>Select Country</h2>
            <div class="row d-flex justify-content-center">
                <div class="col-4">
                    <select class="form-control" id="selectCountry">
                        <option>--Select Country--</option>
                        <option value="indonesia">Indonesia</option>
                        <option value="malaysia">Malaysia</option>
                    </select>
                </div>
            </div>
        </div>
        <hr>
        `;
    }
  }
   
  customElements.define('select-country', SelectCountry);