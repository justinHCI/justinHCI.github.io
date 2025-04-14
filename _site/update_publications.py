import requests
import json

# Replace with your ORCID ID
orcid_id = "0000-0003-1487-9207"
url = f"https://pub.orcid.org/v3.0/{orcid_id}/works"

headers = {"Accept": "application/json"}
response = requests.get(url, headers=headers)

if response.status_code == 200:
    data = response.json()

    # Extract publications from ORCID data
    fetched_publications = []
    for work in data["group"]:
        title = work["work-summary"][0]["title"]["title"]["value"]
        year = work["work-summary"][0].get("publication-date", {}).get("year", {}).get("value", "Unknown Year")
        journal = work["work-summary"][0].get("journal-title", {}).get("value", "Unknown Journal")
        doi = work["work-summary"][0].get("external-ids", {}).get("external-id", [{}])[0].get("external-id-url", {}).get("value", None)

        # Extract authors (if available)
        contributors = work.get("contributors", {}).get("contributor", [])
        authors = ", ".join(
            [contributor["credit-name"]["value"] for contributor in contributors if "credit-name" in contributor]
        )
        if not authors:
            authors = "Unknown Author"

        # Format the publication in Markdown format
        formatted_pub = f"- **{authors}** ({year}). {title}. *{journal}*. {'[DOI](' + doi + ')' if doi else ''}"
        fetched_publications.append(formatted_pub)

    # Read the existing publications from publications.md
    with open("publications.md", "r", encoding="utf-8") as file:
        existing_content = file.read()

    # Find new publications
    new_publications = [pub for pub in fetched_publications if pub not in existing_content]

    # Output new publications in Markdown format
    if new_publications:
        print("New publications found:")
        print("\n".join(new_publications))
    else:
        print("No new publications found.")
else:
    print("Failed to fetch data from ORCID.")
print(json.dumps(work, indent=2))