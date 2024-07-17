document.addEventListener('DOMContentLoaded', function() {
    const customSelects = document.querySelectorAll('.custom-select');
    const resourceSlidersContainer = document.getElementById('resource-sliders');
    const costEstimationContainer = document.getElementById('cost-estimation');
    const costRates = {
        airbyte: 0.1,
        dlt: 0.05,
        dbt: 0.2,
        dataform: 0.15,
        bigquery: 0.25,
        cloud_storage: 0.2,
        looker: 0.3,
        metabase: 0.25,
        lightdash: 0.2,
        airflow: 0.1,
        dagster: 0.15
    };
    const stageMapping = {
        ingestion: 'Ingestion',
        storage: 'Storage',
        transformation: 'Transformation',
        analysis: 'Analysis',
        orchestration: 'Orchestration'
    };

    customSelects.forEach(select => {
        const selected = select.querySelector('.select-selected');
        const options = select.querySelector('.select-items');
        const selectedOptionsContainer = document.createElement('div');
        selectedOptionsContainer.classList.add('selected-options');
        select.appendChild(selectedOptionsContainer);

        selected.addEventListener('click', () => {
            options.classList.toggle('select-hide');
            selected.classList.toggle('select-arrow-active');
        });

        options.addEventListener('click', event => {
            if (event.target.tagName === 'DIV' || event.target.parentElement.tagName === 'DIV') {
                const option = event.target.tagName === 'DIV' ? event.target : event.target.parentElement;
                const value = option.getAttribute('data-value');
                const imgSrc = option.querySelector('img').getAttribute('src');
                const text = option.textContent.trim();
                const stage = select.id;

                // Check if the option is already selected
                const alreadySelected = selectedOptionsContainer.querySelector(`div[data-value="${value}"]`);

                if (alreadySelected) {
                    // Remove the selected option
                    selectedOptionsContainer.removeChild(alreadySelected);
                    removeResourceSlider(stage, value);
                } else {
                    // Add the selected option
                    const selectedOption = document.createElement('div');
                    selectedOption.setAttribute('data-value', value);
                    selectedOption.innerHTML = `<img src="${imgSrc}" alt="${text}"> ${text}`;
                    selectedOptionsContainer.appendChild(selectedOption);
                    addResourceSlider(stage, value, text);
                }

                // Adjust the min-height based on the number of selected items
                adjustHeight(select);
            }
        });
    });

    document.addEventListener('click', event => {
        if (!event.target.matches('.select-selected')) {
            customSelects.forEach(select => {
                select.querySelector('.select-items').classList.add('select-hide');
                select.querySelector('.select-selected').classList.remove('select-arrow-active');
            });
        }
    });

    function adjustHeight(select) {
        const selectedOptionsContainer = select.querySelector('.selected-options');
        const numSelected = selectedOptionsContainer.children.length;
        if (numSelected === 0) {
            select.style.minHeight = '80px';
        } else {
            select.style.minHeight = 'auto';
        }
    }

    function addResourceSlider(stage, value, text) {
        let stageContainer = resourceSlidersContainer.querySelector(`.resource-stage[data-stage="${stage}"]`);
        if (!stageContainer) {
            stageContainer = document.createElement('div');
            stageContainer.classList.add('resource-stage');
            stageContainer.setAttribute('data-stage', stage);
            stageContainer.innerHTML = `<h3>${stageMapping[stage]}</h3>`;
            resourceSlidersContainer.appendChild(stageContainer);
        }

        const sliderContainer = document.createElement('div');
        sliderContainer.classList.add('resource-slider');
        sliderContainer.setAttribute('data-value', value);

        sliderContainer.innerHTML = `
            <label for="${value}-slider">${text} (GB):</label>
            <input type="number" id="${value}-input" name="${value}" min="0" max="100" value="10" step="0.001" oninput="updateSlider('${value}')">
            <input type="range" id="${value}-slider" name="${value}" min="0" max="100" value="10" step="0.001" oninput="updateInput('${value}'); updateCostEstimation()">
        `;

        stageContainer.appendChild(sliderContainer);
        updateCostEstimation();
    }

    function removeResourceSlider(stage, value) {
        const stageContainer = resourceSlidersContainer.querySelector(`.resource-stage[data-stage="${stage}"]`);
        const slider = stageContainer.querySelector(`div[data-value="${value}"]`);
        if (slider) {
            stageContainer.removeChild(slider);
            if (!stageContainer.querySelector('.resource-slider')) {
                resourceSlidersContainer.removeChild(stageContainer);
            }
        }
        updateCostEstimation();
    }

    window.updateSlider = function(value) {
        const input = document.getElementById(`${value}-input`);
        const slider = document.getElementById(`${value}-slider`);
        slider.value = input.value;
        updateCostEstimation();
    };

    window.updateInput = function(value) {
        const input = document.getElementById(`${value}-input`);
        const slider = document.getElementById(`${value}-slider`);
        input.value = slider.value;
        updateCostEstimation();
    };

    window.updateCostEstimation = function() {
        let totalCost = 0;
        const sliders = resourceSlidersContainer.querySelectorAll('input[type="range"]');
        sliders.forEach(slider => {
            const value = slider.name;
            const gb = slider.value;
            const rate = costRates[value];
            totalCost += gb * rate;
        });

        costEstimationContainer.innerHTML = `Estimated Cost: $${totalCost.toFixed(2)}`;
    };
});

function generateCode() {
    const stages = ['ingestion', 'storage', 'transformation', 'analysis', 'orchestration'];
    let code = '';

    stages.forEach(stage => {
        const selectedOptions = document.querySelectorAll(`#${stage} .selected-options div[data-value]`);
        selectedOptions.forEach(option => {
            const value = option.getAttribute('data-value');
            code += generateStageCode(stage, value);
        });
    });

    document.getElementById('generated-code').innerText = code;
}

function generateStageCode(stage, value) {
    switch (stage) {
        case 'ingestion':
            return ingestionCode(value);
        case 'storage':
            return storageCode(value);
        case 'transformation':
            return transformationCode(value);
        case 'analysis':
            return analysisCode(value);
        case 'orchestration':
            return orchestrationCode(value);
        default:
            return '';
    }
}

function ingestionCode(value) {
    switch (value) {
        case 'airbyte':
            return `
            # Airbyte Ingestion
            resource "airbyte_source" "example" {
              name = "example"
              source_definition_id = "source-id"
              workspace_id = "workspace-id"
              connection_configuration = {
                key = "value"
              }
            }
            `;
        case 'dlt':
            return `
            # Dlt Ingestion
            resource "dlt_source" "example" {
              name = "example"
              source_configuration = {
                key = "value"
              }
            }
            `;
        default:
            return '';
    }
}

function transformationCode(value) {
    switch (value) {
        case 'dbt':
            return `
            # dbt Transformation
            resource "dbt_project" "example" {
              name = "example"
              profiles_dir = "/path/to/profiles"
            }
            `;
        case 'dataform':
            return `
            # Dataform Transformation
            resource "dataform_project" "example" {
              name = "example"
              project_dir = "/path/to/project"
            }
            `;
        default:
            return '';
    }
}

function storageCode(value) {
    switch (value) {
        case 'bigquery':
            return `
            # BigQuery Storage
            resource "google_bigquery_dataset" "example" {
              dataset_id = "example"
              project = "my-project-id"
              location = "US"
            }
            `;
        case 'cloud_storage':
            return `
            # Cloud Storage with BigLake
            resource "google_storage_bucket" "example" {
              name = "example-bucket"
              location = "US"
            }
            `;
        default:
            return '';
    }
}

function analysisCode(value) {
    switch (value) {
        case 'looker':
            return `
            # Looker Studio Analysis
            resource "looker_dashboard" "example" {
              name = "example"
              dashboard_configuration = {
                key = "value"
              }
            }
            `;
        case 'metabase':
            return `
            # Metabase Analysis
            resource "metabase_dashboard" "example" {
              name = "example"
              dashboard_configuration = {
                key = "value"
              }
            }
            `;
        case 'lightdash':
            return `
            # Lightdash Analysis
            resource "lightdash_project" "example" {
              name = "example"
              project_configuration = {
                key = "value"
              }
            }
            `;
        default:
            return '';
    }
}

function orchestrationCode(value) {
    switch (value) {
        case 'airflow':
            return `
            # Airflow Orchestration
            resource "airflow_dag" "example" {
              name = "example"
              dag_configuration = {
                key = "value"
              }
            }
            `;
        case 'dagster':
            return `
            # Dagster Orchestration
            resource "dagster_pipeline" "example" {
              name = "example"
              pipeline_configuration = {
                key = "value"
              }
            }
            `;
        default:
            return '';
    }
}
