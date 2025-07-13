import { Component } from 'react';
import Header from './Header';
import SearchBar from './SearchBar';

interface TopSectionProps {
  onSearch: (searchTerm: string) => void;
}

interface TopSectionState {
  searchTerm: string;
}

export default class TopSection extends Component<
  TopSectionProps,
  TopSectionState
> {
  constructor(props: TopSectionProps) {
    super(props);
    this.state = {
      searchTerm: '',
    };
  }

  componentDidMount() {
    const savedTerm = localStorage.getItem('searchTerm') || '';
    this.setState({ searchTerm: savedTerm });
    if (savedTerm.trim() !== '') {
      this.props.onSearch(savedTerm.trim());
    }
  }

  handleInputChange = (value: string) => {
    this.setState({ searchTerm: value });
  };

  handleSearch = () => {
    const trimmedTerm = this.state.searchTerm.trim();
    this.setState({ searchTerm: trimmedTerm });
    localStorage.setItem('searchTerm', trimmedTerm);
    this.props.onSearch(trimmedTerm);
  };

  render() {
    return (
      <>
        <Header />
        <SearchBar
          value={this.state.searchTerm}
          onChange={this.handleInputChange}
          onSearch={this.handleSearch}
        />
      </>
    );
  }
}
