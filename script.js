document.addEventListener('DOMContentLoaded', function() {
    const customSelects = document.querySelectorAll('.custom-select');
    
    customSelects.forEach(select => {
        const selected = select.querySelector('.select-selected');
        const options = select.querySelector('.select-items');
        
        selected.addEventListener('click', () => {
            options.classList.toggle('select-hide');
            selected.classList.toggle('select-arrow-active');
        });
        
        options.addEventListener('click', event => {
            if (event.target.tagName === 'DIV') {
                selected.innerHTML = event.target.innerHTML;
                selected.setAttribute('data-value', event.target.getAttribute('data-value'));
                options.classList.add('select-hide');
                selected.classList.remove('select-arrow-active');
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
});

function generateCode() {
    const ingestion = document.querySelector('.stage:nth-child(1) .select-selected').getAttribute('data-value');
    const transformation = document.querySelector('.stage:nth-child(3) .select-selected').getAttribute('data-value');
    const storage = document.querySelector('.stage:nth-child(2) .select-selected').getAttribute('data-value');
    const analysis = document.querySelector('.stage:nth-child(4) .select-selected').getAttribute('data-value');
    const orchestration = document.querySelector('.stage:nth-child(5) .select-selected').getAttribute('data-value');

    let code = '';

    // Ingestion
    switch (ingestion) {
        case 'airbyte':
            code += `
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
            break;
        case 'dlt':
            code += `
            # Dlt Ingestion
            resource "dlt_source" "example" {
              name = "example"
              source_configuration = {
                key = "value"
              }
            }
            `;
            break;
    }

    // Transformation
    switch (transformation) {
        case 'dbt':
            code += `
            # dbt Transformation
            resource "dbt_project" "example" {
              name = "example"
              profiles_dir = "/path/to/profiles"
            }
            `;
            break;
        case 'dataform':
            code += `
            # Dataform Transformation
            resource "dataform_project" "example" {
              name = "example"
              project_dir = "/path/to/project"
            }
            `;
            break;
    }

    // Storage
    switch (storage) {
        case 'bigquery':
            code += `
            # BigQuery Storage
            resource "google_bigquery_dataset" "example" {
              dataset_id = "example"
              project = "my-project-id"
              location = "US"
            }
            `;
            break;
        case 'cloud_storage':
            code += `
            # Cloud Storage with BigLake
            resource "google_storage_bucket" "example" {
              name = "example-bucket"
              location = "US"
            }
            `;
            break;
    }

    // Analysis
    switch (analysis) {
        case 'looker':
            code += `
            # Looker Studio Analysis
            resource "looker_dashboard" "example" {
              name = "example"
              dashboard_configuration = {
                key = "value"
              }
            }
            `;
            break;
        case 'metabase':
            code += `
            # Metabase Analysis
            resource "metabase_dashboard" "example" {
              name = "example"
              dashboard_configuration = {
                key = "value"
              }
            }
            `;
            break;
        case 'lightdash':
            code += `
            # Lightdash Analysis
            resource "lightdash_project" "example" {
              name = "example"
              project_configuration = {
                key = "value"
              }
            }
            `;
            break;
    }

    // Orchestration
    switch (orchestration) {
        case 'airflow':
            code += `
            # Airflow Orchestration
            resource "airflow_dag" "example" {
              name = "example"
              dag_configuration = {
                key = "value"
              }
            }
            `;
            break;
        case 'dagster':
            code += `
            # Dagster Orchestration
            resource "dagster_pipeline" "example" {
              name = "example"
              pipeline_configuration = {
                key = "value"
              }
            }
            `;
            break;
    }

    document.getElementById('generated-code').innerText = code;
}
