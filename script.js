document.addEventListener('DOMContentLoaded', function() {
    const customSelects = document.querySelectorAll('.custom-select');

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

                // Check if the option is already selected
                const alreadySelected = selectedOptionsContainer.querySelector(`div[data-value="${value}"]`);

                if (alreadySelected) {
                    // Remove the selected option
                    selectedOptionsContainer.removeChild(alreadySelected);
                } else {
                    // Add the selected option
                    const selectedOption = document.createElement('div');
                    selectedOption.setAttribute('data-value', value);
                    selectedOption.innerHTML = `<img src="${imgSrc}" alt="${text}"> ${text}`;
                    selectedOptionsContainer.appendChild(selectedOption);
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
